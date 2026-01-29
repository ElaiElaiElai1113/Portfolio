# Portfolio JSON Prompts

Copy these prompts when asking AI to generate portfolio data in the correct format.

---

## 🚀 Project Entry Prompt

```
Generate a single JSON object for a portfolio project with this exact structure (no markdown formatting, just the JSON):

{
  "id": "unique-id",
  "title": "Project Title",
  "slug": "url-friendly-slug",
  "summary": "One sentence summary",
  "role": "Your role",
  "problem": "Problem statement",
  "solution": "Your approach",
  "case_study_md": "# Title\n\n**Role | Year**\n\n## Overview\n\nDetails...",
  "stack": ["Tech1", "Tech2"],
  "tags": ["Tag1", "Tag2"],
  "featured": false,
  "featured_order": 0,
  "status": "published",
  "media": []
}

Project details: [PASTE YOUR PROJECT INFO HERE]
```

## 💼 Experience Entry Prompt

```
Generate a single JSON object for a work experience with this exact structure (no markdown formatting, just the JSON):

{
  "id": "experience-X",
  "company": "Company Name",
  "role": "Job Title",
  "location": "Location",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "current": false,
  "bullets": ["Achievement 1", "Achievement 2"],
  "skills": ["Skill1", "Skill2"],
  "sort_order": X
}

Experience details: [PASTE YOUR EXPERIENCE INFO HERE]
```

## 📜 Certification Entry Prompt

```
Generate a single JSON object for a certification with this exact structure (no markdown formatting, just the JSON):

{
  "id": "cert-X",
  "title": "Certification Name",
  "name": "Certification Name",
  "issuer": "Issuing Organization",
  "issue_date": "YYYY-MM-DD",
  "sort_order": X
}

Certification details: [PASTE YOUR CERTIFICATION INFO HERE]
```

## 🎯 Skill Entry Prompt

```
Generate a single JSON object for a skill with this exact structure (no markdown formatting, just the JSON):

{
  "id": "skill-X",
  "name": "Skill Name",
  "category": "Frontend or Backend or Project Management or Tools or Soft Skills",
  "level": "beginner or intermediate or advanced or expert",
  "proficiency": "Beginner or Intermediate or Advanced or Expert",
  "sort_order": X
}

Skill details: [PASTE YOUR SKILL INFO HERE]
```

---

## 📋 Quick Reference

### Skill Categories
- Frontend
- Backend
- Project Management
- Tools
- Soft Skills

### Proficiency Levels (must match case)
- Beginner (beginner)
- Intermediate (intermediate)
- Advanced (advanced)
- Expert (expert)

### Important Notes
1. **sort_order**: Use sequential numbers (1, 2, 3...) to control display order
2. **slug**: Must be URL-friendly (lowercase, hyphens instead of spaces)
3. **status**: Use "published" for items you want to show, "draft" to hide
4. **case_study_md**: Use proper markdown formatting with # for headings
