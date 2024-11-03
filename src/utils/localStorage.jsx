const employees = [
    {
        "id": 1,
        "email": "employee1@example.com",
        "password": "123",
        "name": "Alice Johnson",
        "tasks_count": {
            "active": 2,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "id": 1, // Added ID
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
                "id": 2, // Added ID
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
                "id": 3, // Added ID
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
    },
    {
        "id": 2,
        "email": "employee2@example.com",
        "password": "123",
        "name": "Bob Smith",
        "tasks_count": {
            "active": 2,
            "new_task": 1,
            "completed": 1,
            "failed": 1
        },
        "tasks": [
            {
                "id": 4, // Added ID
                "active": true,
                "new_task": true,
                "completed": false,
                "failed": false,
                "title": "Design New Logo",
                "description": "Create a new logo for the upcoming campaign.",
                "date": "2024-11-05",
                "category": "Design"
            },
            {
                "id": 5, // Added ID
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": true,
                "title": "Market Research",
                "description": "Conduct market research for the new product launch.",
                "date": "2024-11-02",
                "category": "Research"
            },
            {
                "id": 6, // Added ID
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false,
                "title": "Email Campaign",
                "description": "Launch the email campaign for the new product.",
                "date": "2024-10-25",
                "category": "Marketing"
            }
        ]
    },
    {
        "id": 3,
        "email": "employee3@example.com",
        "password": "123",
        "name": "Charlie Brown",
        "tasks_count": {
            "active": 2,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "id": 7, // Added ID
                "active": true,
                "new_task": true,
                "completed": false,
                "failed": false,
                "title": "Prepare Presentation",
                "description": "Create a presentation for the upcoming client meeting.",
                "date": "2024-11-01",
                "category": "Presentation"
            },
            {
                "id": 8, // Added ID
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false,
                "title": "Client Follow-Up",
                "description": "Follow up with clients regarding their feedback.",
                "date": "2024-10-31",
                "category": "Client Management"
            },
            {
                "id": 9, // Added ID
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false,
                "title": "Budget Review",
                "description": "Review the budget for the previous quarter.",
                "date": "2024-10-29",
                "category": "Finance"
            }
        ]
    },
    {
        "id": 4,
        "email": "employee4@example.com",
        "password": "123",
        "name": "Diana Prince",
        "tasks_count": {
            "active": 2,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "id": 10, // Added ID
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false,
                "title": "Inventory Check",
                "description": "Conduct a check of the current inventory levels.",
                "date": "2024-10-30",
                "category": "Operations"
            },
            {
                "id": 11, // Added ID
                "active": true,
                "new_task": true,
                "completed": false,
                "failed": false,
                "title": "Supplier Meeting",
                "description": "Meet with suppliers to discuss upcoming orders.",
                "date": "2024-11-03",
                "category": "Meeting"
            },
            {
                "id": 12, // Added ID
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false,
                "title": "Staff Training",
                "description": "Complete staff training on new software.",
                "date": "2024-10-26",
                "category": "Training"
            }
        ]
    },
    {
        "id": 5,
        "email": "employee5@example.com",
        "password": "12345Password",
        "name": "Eve Adams",
        "tasks_count": {
            "active": 2,
            "new_task": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "id": 13, // Added ID
                "active": true,
                "new_task": false,
                "completed": false,
                "failed": false,
                "title": "Social Media Update",
                "description": "Update social media platforms with the latest news.",
                "date": "2024-10-30",
                "category": "Social Media"
            },
            {
                "id": 14, // Added ID
                "active": true,
                "new_task": true,
                "completed": false,
                "failed": false,
                "title": "Content Creation",
                "description": "Create blog content for the website.",
                "date": "2024-11-02",
                "category": "Content"
            },
            {
                "id": 15, // Added ID
                "active": false,
                "new_task": false,
                "completed": true,
                "failed": false,
                "title": "Website Audit",
                "description": "Complete a full audit of the company website.",
                "date": "2024-10-25",
                "category": "Maintenance"
            }
        ]
    }
];


const admin = [
    {
        "id": 1,
        "email": "admin@example.com",
        "password": "adminSecurePassword"
    }
]

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
    const empData = JSON.parse(localStorage.getItem('employees'))
    const adminData = JSON.parse(localStorage.getItem('admin'))
    return {adminData, empData}   
}