const t = {
    "id": 1,
    "email": "employee1@example.com",
    "password": "123",
    "name": "Alice Johnson",
    "tasks_count": {
        "active": 2,
        "new_task": 1,
        "completed": 1,
        "failed": 0,
        "color": {
            "new_task": "bg-yello-400",
            "active": "bg-red-400",
            "completed": "bg-green-400"
        }
    },
    "tasks": [
        {
            "id": 1,
            "active": true,
            "new_task": false,
            "completed": false,
            "failed": false,
            "title": "Complete Project Report",
            "description": "Finalize and submit the quarterly project report.",
            "date": "2024-10-30",
            "category": "Work"
        },
        {
            "id": 2,
            "active": true,
            "new_task": false,
            "completed": false,
            "failed": false,
            "title": "Team Meeting",
            "description": "Attend the weekly team meeting to discuss progress.",
            "date": "2024-10-31",
            "category": "Meeting"
        },
        {
            "id": 3,
            "active": false,
            "new_task": false,
            "completed": true,
            "failed": false,
            "title": "Update Website",
            "description": "Make necessary updates to the company website.",
            "date": "2024-10-28",
            "category": "Maintenance"
        }
    ]
}


for (let ke in t.tasks_count.color) {
    console.log(ke, t.tasks[[0]][ke])
}