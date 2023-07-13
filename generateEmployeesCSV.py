import random
import string
import csv

def generate_employee(employee_id, manager_id):
    name = generate_random_name()
    phone = generate_random_phone()
    salary = generate_salary_based_on_department()
    role = generate_random_role()
    location = generate_random_location()
    employee_data = {
        "_id": employee_id,
        "name": name,
        "phone": phone,
        "salary": salary,
        "role": role,
        "location": location,
        "employeeId": generate_random_employee_id(),
        "managerId": manager_id
    }
    return employee_data

def generate_random_name():
    first_names = ["William", "Kwame", "Kwabena", "Kwaku", "John", "Jane", "Michael", "Sarah"]
    last_names = ["Boafo", "Smith", "Doe", "Johnson", "Williams", "Brown", "Davis", "Miller"]
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    return f"{first_name} {last_name}"

def generate_random_phone():
    phone = "024 "
    for _ in range(7):
        phone += random.choice(string.digits)
    return phone

def generate_salary_based_on_department():
    department_salaries = {
        "HR": (80000, 120000),
        "Digital Enablement": (90000, 130000),
        "Finance": (85000, 125000),
        "Sales": (85000, 120000),
        "Marketing": (80000, 115000)
    }
    role = generate_random_role()
    salary_range = department_salaries.get(role, (80000, 120000))
    return str(random.randint(salary_range[0], salary_range[1]))

def generate_random_role():
    roles = ["HR", "Digital Enablement", "Finance", "Sales", "Marketing"]
    return random.choice(roles)

def generate_random_location():
    cities = ["Hartford, CT", "New York, NY", "Boston, MA", "Chicago, IL", "San Francisco, CA"]
    return random.choice(cities)

def generate_random_employee_id():
    return ''.join(random.choices(string.digits, k=6))

def generate_employees(num_employees):
    employees = []
    managers = []
    manager_id = "123457"
    
    # Generate manager
    manager = generate_employee(manager_id, "0")
    managers.append(manager)
    employees.append(manager)
    
    # Generate non-manager employees
    for i in range(1, num_employees + 1):
        employee_id = f"{i + 123456}"
        employee = generate_employee(employee_id, manager_id)
        employees.append(employee)
    
    # Assign managerId to non-manager employees
    for employee in employees:
        if employee["managerId"] == "0":
            continue
        manager = random.choice(managers)
        employee["managerId"] = manager["employeeId"]
    
    return employees

# Generate 1000 employees
num_employees = 1000
employees = generate_employees(num_employees)

# Save employees to CSV file
output_file = "employees.csv"
fieldnames = employees[0].keys()

with open(output_file, "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(employees)

print(f"Generated {num_employees} employees and saved to {output_file}.")
