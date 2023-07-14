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
    first_names = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila",
    "Aria", "Scarlett", "Victoria", "Madison", "Luna", "Grace", "Chloe", "Penelope", "Layla", "Riley",
    "Zoey", "Nora", "Lily", "Eleanor", "Hannah", "Lillian", "Addison", "Aubrey", "Ellie", "Stella",
    "Natalie", "Zoe", "Leah", "Hazel", "Violet", "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella",
    "Claire", "Skylar", "Lucy", "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Emilia",
    "Kennedy", "Samantha", "Maya", "Willow", "Kinsley", "Naomi", "Aaliyah", "Elena", "Sarah", "Ariana",
    "Allison", "Gabriella", "Alice", "Madelyn", "Cora", "Ruby", "Eva", "Serenity", "Autumn", "Adeline",
    "Hailey", "Gianna", "Valentina", "Isla", "Eliana", "Quinn", "Nevaeh", "Ivy", "Sadie", "Piper",
    "Lydia", "Alexa", "Josephine", "Emery", "Julia", "Delilah"]
    last_names = [
    "Smith", "Johnson", "Brown", "Taylor", "Miller", "Wilson", "Moore", "Anderson", "Thomas", "Jackson",
    "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez",
    "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez",
    "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez",
    "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart",
    "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera",
    "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James",
    "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson",
    "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
    "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz"]
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
    0: (60000, 75000),
    1: (80000, 100000),
    2: (50000, 70000),
    3: (65000, 80000),
    4: (60000, 75000),
    5: (90000, 120000),
    6: (70000, 90000),
    7: (45000, 60000),
    8: (35000, 45000),
    9: (40000, 55000),
    10: (70000, 90000),
    11: (45000, 60000),
    12: (50000, 80000),  # Consolidated HR role with salary range
    13: (55000, 70000),
    14: (60000, 80000),
    15: (60000, 75000),
    16: (65000, 85000),
    17: (60000, 80000),
    18: (80000, 110000)}
    role = generate_random_role()
    salary_range = department_salaries[role] 
    return str(random.randint(salary_range[0], salary_range[1]))

def generate_random_role():
    roles = [
    "Claims Adjuster", "Underwriter", "Insurance Agent", "Loss Control Specialist",
    "Claims Examiner", "Actuary", "Risk Analyst", "Insurance Sales Representative",
    "Customer Service Representative", "Claims Processor", "Insurance Broker",
    "Underwriting Assistant", "HR", "Benefits Administrator", "Recruiter",
    "Training Specialist", "Compensation Analyst", "Employee Relations Specialist",
    "Talent Acquisition Manager"]
    roles_dict = {i: role for i, role in enumerate(roles)}
    return random.choice(list(roles_dict.keys()))

def generate_random_location():
    locations = {
    "Hartford": "06101",
    "New York City": "10001",
    "Los Angeles": "90001",
    "Chicago": "60601",
    "Philadelphia": "19101",
    "Dallas": "75201",
    "Atlanta": "30301",
    "Boston": "02101",
    "Miami": "33101",
    "Denver": "80201",
    "Seattle": "98101",
    "San Francisco": "94101",
    "Charlotte": "28201",
    "Minneapolis": "55401",
    "Phoenix": "85001",
    "Houston": "77001",
    "Detroit": "48201",
    "St. Louis": "63101",
    "Cleveland": "44101",
    "Tampa": "33601"}
    cities = list(locations.values())
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
