"""add early bird pricing and registration review models

Revision ID: abf9866a1b52
Revises: 
Create Date: 2026-09-21 21:34:29.781679

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    # Idempotent table creation
    if 'admin_action_logs' not in inspector.get_table_names():
        op.create_table('admin_action_logs',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('registration_id', sa.UUID(), nullable=False),
        sa.Column('admin_id', sa.UUID(), nullable=True),
        sa.Column('action', sa.Enum('verified', 'rejected', name='admin_action_enum'), nullable=False),
        sa.Column('reason', sa.Text(), nullable=True),
        sa.Column('timestamp', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['admin_id'], ['users.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['registration_id'], ['event_registrations.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
        )

    # Indexes guarded
    existing_indexes = inspector.get_indexes('admin_action_logs')
    existing_indexes_events = inspector.get_indexes('events')
    existing_indexes_reg = inspector.get_indexes('event_registrations')
    admin_idx_names = {i['name'] for i in existing_indexes}
    events_idx_names = {i['name'] for i in existing_indexes_events}
    reg_idx_names = {i['name'] for i in existing_indexes_reg}

    if 'ix_admin_action_logs_registration_id' not in admin_idx_names:
        op.create_index(op.f('ix_admin_action_logs_registration_id'), 'admin_action_logs', ['registration_id'], unique=False)
    if 'ix_event_registrations_leader_id' not in reg_idx_names:
        op.create_index(op.f('ix_event_registrations_leader_id'), 'event_registrations', ['leader_id'], unique=False)

    # Events columns guarded (add before indexes that reference them)
    events_cols = {col['name'] for col in inspector.get_columns('events')}
    if 'deleted_at' not in events_cols:
        op.add_column('events', sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True))
    if 'early_bird_enabled' not in events_cols:
        op.add_column('events', sa.Column('early_bird_enabled', sa.Boolean(), server_default=sa.text('false'), nullable=False))
    if 'early_bird_capacity' not in events_cols:
        op.add_column('events', sa.Column('early_bird_capacity', sa.Integer(), nullable=True))
    if 'early_bird_fee' not in events_cols:
        op.add_column('events', sa.Column('early_bird_fee', sa.Numeric(precision=10, scale=2), nullable=True))
    if 'early_bird_ends_at' not in events_cols:
        op.add_column('events', sa.Column('early_bird_ends_at', sa.DateTime(timezone=True), nullable=True))
    if 'early_bird_taken' not in events_cols:
        op.add_column('events', sa.Column('early_bird_taken', sa.Integer(), server_default=sa.text('0'), nullable=False))

    # Indexes that reference new columns — only after columns exist
    events_idx_after = {i['name'] for i in inspector.get_indexes('events')}
    if 'ix_events_deleted_at' not in events_idx_after:
        op.create_index(op.f('ix_events_deleted_at'), 'events', ['deleted_at'], unique=False)


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    events_idx = {i['name'] for i in inspector.get_indexes('events')}
    reg_idx = {i['name'] for i in inspector.get_indexes('event_registrations')}
    admin_idx = {i['name'] for i in inspector.get_indexes('admin_action_logs')}

    # Drop indexes before columns
    if 'ix_events_deleted_at' in events_idx:
        op.drop_index(op.f('ix_events_deleted_at'), table_name='events')
    if 'ix_event_registrations_leader_id' in reg_idx:
        op.drop_index(op.f('ix_event_registrations_leader_id'), table_name='event_registrations')
    if 'ix_admin_action_logs_registration_id' in admin_idx:
        op.drop_index(op.f('ix_admin_action_logs_registration_id'), table_name='admin_action_logs')

    events_cols = {col['name'] for col in inspector.get_columns('events')}
    # Drop columns (reverse order of upgrade)
    for col in ['early_bird_taken', 'early_bird_ends_at', 'early_bird_fee', 'early_bird_capacity', 'early_bird_enabled', 'deleted_at']:
        if col in events_cols:
            op.drop_column('events', col)

    # Drop table last
    if 'admin_action_logs' in inspector.get_table_names():
        op.drop_table('admin_action_logs')

# revision identifiers, used by Alembic.
revision: str = 'abf9866a1b52'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None
