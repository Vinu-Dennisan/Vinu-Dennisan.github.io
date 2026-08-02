"""
Student Management System
--------------------------
A simple CRUD (Create, Read, Update, Delete) application to manage
student records, built with Python and SQLite.

Note: This uses SQLite instead of MySQL so it runs instantly with
zero setup (SQLite is built into Python - no server installation
needed). The database logic (SQL queries, CRUD structure) is the
same style you'd use with MySQL - only the connection line would
change if you later connect to a real MySQL server.

How to run:
    python student_management.py

Everything is stored in a local file called students.db,
created automatically the first time you run this.
"""

import sqlite3

DB_NAME = "students.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            roll_no TEXT NOT NULL UNIQUE,
            department TEXT,
            year INTEGER,
            email TEXT
        )
    """)
    return conn


def add_student():
    print("\n--- Add New Student ---")
    name = input("Name: ").strip()
    roll_no = input("Roll No: ").strip()
    department = input("Department: ").strip()
    year = input("Year (1-4): ").strip()
    email = input("Email: ").strip()

    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO students (name, roll_no, department, year, email) VALUES (?, ?, ?, ?, ?)",
            (name, roll_no, department, year, email)
        )
        conn.commit()
        print(f"✅ Student '{name}' added successfully.")
    except sqlite3.IntegrityError:
        print("❌ Error: A student with that roll number already exists.")
    finally:
        conn.close()


def view_students():
    print("\n--- All Students ---")
    conn = get_connection()
    rows = conn.execute("SELECT id, name, roll_no, department, year, email FROM students").fetchall()
    conn.close()

    if not rows:
        print("No student records found.")
        return

    print(f"{'ID':<4}{'Name':<20}{'Roll No':<12}{'Dept':<10}{'Year':<6}{'Email':<25}")
    print("-" * 77)
    for r in rows:
        print(f"{r[0]:<4}{r[1]:<20}{r[2]:<12}{r[3]:<10}{r[4]:<6}{r[5]:<25}")


def update_student():
    print("\n--- Update Student ---")
    roll_no = input("Enter Roll No of student to update: ").strip()

    conn = get_connection()
    student = conn.execute("SELECT * FROM students WHERE roll_no = ?", (roll_no,)).fetchone()

    if not student:
        print("❌ No student found with that roll number.")
        conn.close()
        return

    print("Leave a field blank to keep it unchanged.")
    name = input(f"Name [{student[1]}]: ").strip() or student[1]
    department = input(f"Department [{student[3]}]: ").strip() or student[3]
    year = input(f"Year [{student[4]}]: ").strip() or student[4]
    email = input(f"Email [{student[5]}]: ").strip() or student[5]

    conn.execute(
        "UPDATE students SET name=?, department=?, year=?, email=? WHERE roll_no=?",
        (name, department, year, email, roll_no)
    )
    conn.commit()
    conn.close()
    print("✅ Student record updated.")


def delete_student():
    print("\n--- Delete Student ---")
    roll_no = input("Enter Roll No of student to delete: ").strip()

    conn = get_connection()
    cur = conn.execute("DELETE FROM students WHERE roll_no = ?", (roll_no,))
    conn.commit()
    conn.close()

    if cur.rowcount:
        print("✅ Student record deleted.")
    else:
        print("❌ No student found with that roll number.")


def search_student():
    print("\n--- Search Student ---")
    keyword = input("Enter name or roll number to search: ").strip()

    conn = get_connection()
    rows = conn.execute(
        "SELECT id, name, roll_no, department, year, email FROM students WHERE name LIKE ? OR roll_no LIKE ?",
        (f"%{keyword}%", f"%{keyword}%")
    ).fetchall()
    conn.close()

    if not rows:
        print("No matching students found.")
        return

    for r in rows:
        print(f"ID:{r[0]} | Name:{r[1]} | Roll:{r[2]} | Dept:{r[3]} | Year:{r[4]} | Email:{r[5]}")


def main_menu():
    while True:
        print("\n===== STUDENT MANAGEMENT SYSTEM =====")
        print("1. Add Student")
        print("2. View All Students")
        print("3. Update Student")
        print("4. Delete Student")
        print("5. Search Student")
        print("6. Exit")

        choice = input("Enter your choice (1-6): ").strip()

        if choice == "1":
            add_student()
        elif choice == "2":
            view_students()
        elif choice == "3":
            update_student()
        elif choice == "4":
            delete_student()
        elif choice == "5":
            search_student()
        elif choice == "6":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number from 1-6.")


if __name__ == "__main__":
    main_menu()
