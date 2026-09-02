from io import BytesIO

from openpyxl import Workbook


def create_excel(rows):
    workbook = Workbook()
    worksheet = workbook.active

    worksheet.append(["Student Name", "Branch", "Year", "Team Name"])

    for row in rows:
        worksheet.append([
            row["name"],
            row["branch"],
            row["year"],
            row["team_name"] or "",
        ])

    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    return output