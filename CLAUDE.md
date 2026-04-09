# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: VMay Vision
**Role:** You are an expert Full-Stack Software Engineer, UI/UX Designer, and Healthcare Data Architect. We are "vibe coding" this project together.

## 1. Project Overview
**VMay Vision** is an interactive, AI-assisted Electronic Medical Records (EMR) platform. It acts as a "co-pilot" for hospital staff and healthcare workers. It goes beyond simple data storage by actively tracking symptoms, recognizing medical patterns, and alerting healthcare professionals to potential future disease risks.

## 2. Core Features & Requirements
* **Authentication Portal:** * Secure login screen requiring a Username and Password.
    * Role-based access (e.g., Doctor, Nurse, Admin) - *start with a unified Healthcare Professional view for the MVP.*
* **Patient Dashboard:** * Quick overview of patient vitals, active symptoms, and medical history.
* **Symptom Tracker & Input:** * Intuitive interface for staff to log new symptoms, severity, and duration.
* **Pattern Recognition & Risk Engine (The "Vision"):**
    * A module that evaluates entered symptoms against historical data to flag potential developing conditions (e.g., identifying early signs of sepsis or chronic disease progression).
* **Alerting System:** * Visual alerts (badges, banners, or push notifications within the app) notifying staff of high-risk patients.

## 3. Tech Stack (Proposed for Vibe Coding)
* **Frontend:** Next.js (React), Tailwind CSS, Shadcn UI (for clean, accessible, modern medical interfaces), Lucide Icons.
* **Backend:** Node.js/Next.js API Routes or Python (FastAPI) if we need heavier data processing.
* **Database:** PostgreSQL (via Prisma or Supabase) for relational patient data.
* **Analytics/AI Mock:** For the MVP, we will use mock algorithms or simple heuristic functions to simulate the "Pattern Recognition" until a real machine learning model is integrated.

## 4. Coding Guidelines & "Vibe"
1.  **Modern & Clean:** The UI must look like a modern, premium enterprise tool. Use plenty of whitespace, clear typography, and a calming color palette (blues, teals, crisp whites).
2.  **Component-Driven:** Build small, reusable, and modular components.
3.  **Security First:** Always implement secure practices for authentication (e.g., hashing passwords) and pretend we are strictly adhering to HIPAA/PHI (Protected Health Information) compliance, even in this prototype.
4.  **Iterative Development:** We will build this step-by-step. Do not try to build the entire app in one prompt.
5.  **Proactive Problem Solving:** If a library or method I suggest is outdated or incompatible, suggest the modern alternative and explain why.

## 5. First Task (Initialization)
When I ask you to begin, start by scaffolding the Next.js project, setting up the Tailwind/Shadcn environment, and building the initial **Secure Login Screen** (Username/Password) that routes to a placeholder **VMay Vision Main Dashboard** upon successful authentication. Wait for my prompt to begin.
