from pydantic import BaseModel
from typing import List


class AdminStatsResponse(BaseModel):
    total_events: int
    total_registrations: int
    pending_approvals: int
    approved_passes: int


class EventStatsItemResponse(BaseModel):
    event_id: str
    total_registrations: int
    pending_count: int


class AdminStatsListResponse(BaseModel):
    # Not used directly; response is a list of EventStatsItemResponse
    pass
