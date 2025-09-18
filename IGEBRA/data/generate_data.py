import pandas as pd
import numpy as np
import random

np.random.seed(42)
random.seed(42)

def generate_student_data(n_students=200):
    student_ids = [f"STU{i:04d}" for i in range(1, n_students + 1)]
    first_names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Avery", "Quinn", "Sam", "Blake", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "James", "Isabella", "Benjamin"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"]
    names = [f"{random.choice(first_names)} {random.choice(last_names)}" for _ in range(n_students)]
    classes = [f"Grade {grade}" for grade in range(9, 13) for _ in range(n_students // 4)]
    if len(classes) < n_students:
        classes.extend([f"Grade {random.randint(9, 12)}" for _ in range(n_students - len(classes))])
    
    base_ability = np.random.normal(70, 15, n_students)
    base_ability = np.clip(base_ability, 20, 95)
    comprehension = base_ability + np.random.normal(0, 8, n_students)
    comprehension = np.clip(comprehension, 20, 100)
    attention = comprehension * 0.7 + np.random.normal(50, 12, n_students)
    attention = np.clip(attention, 15, 100)
    focus = attention * 0.8 + np.random.normal(20, 10, n_students)
    focus = np.clip(focus, 10, 100)
    retention = (comprehension * 0.6 + focus * 0.4) + np.random.normal(0, 8, n_students)
    retention = np.clip(retention, 20, 100)
    assessment_score = (comprehension * 0.3 + attention * 0.2 + focus * 0.2 + retention * 0.3 + np.random.normal(0, 5, n_students))
    assessment_score = np.clip(assessment_score, 30, 100)
    engagement_time = (focus * 0.4 + attention * 0.3) * 0.8 + np.random.normal(0, 15, n_students)
    engagement_time = np.clip(engagement_time, 10, 120)
    
    data = {
        "student_id": student_ids,
        "name": names,
        "class": classes,
        "comprehension": np.round(comprehension, 1),
        "attention": np.round(attention, 1),
        "focus": np.round(focus, 1),
        "retention": np.round(retention, 1),
        "assessment_score": np.round(assessment_score, 1),
        "engagement_time": np.round(engagement_time, 1)
    }
    
    df = pd.DataFrame(data)
    for col in ["comprehension", "attention", "focus", "retention", "assessment_score"]:
        noise = np.random.normal(0, 2, n_students)
        df[col] = np.clip(df[col] + noise, 0, 100)
        df[col] = np.round(df[col], 1)
    
    return df

df = generate_student_data(200)
df.to_csv("data/student_data.csv", index=False)
print(f"Generated {len(df)} student records")
