## Core Features

### 1. User Management

- **Roles**:
  - **Employee**: Can submit requests.
  - **Manager**: Can approve requests from their team.
  - **HR/Admin**: Full system access, final approvals, configurations.
- **Authentication**: Secure login (JWT based).

### 2. Leave Management

- **Dashboard**: View leave balance and history.
- **Apply for Leave**: Form to select leave type, dates, and reason.
  - **Annual Leave**: Limited to 7 working days per year.
  - **Sick Leave**: Unlimited, but requires a doctor's note (surat dokter).
  - **Unpaid Leave**: For other reasons.
- **Approval Workflow**: Manager notification and approval/rejection.
- **Calendar View**: Team leave calendar.

### 3. Reimbursement (Expense Claims)

- **Claim Submission**: Upload receipts, enter amount, category (Travel, Food, Equipment).
- **Status Tracking**: Pending, Approved, Paid, Rejected.
- **Approval Workflow**: Manager check -> HR Finance processing.
- **Reports**: summary of expenses for Admins.

### 4. Gamification & Engagement

- **Attendance (Absensi) XP System**:
  - **Daily Check-in**: Earn Experience Points (XP) for every successful clock-in/clock-out.
  - **Punctuality Bonus**: Extra XP for clocking in before the designated start time.
  - **Streak Multiplier**: Bonus points for maintaining a "Perfect Attendance" streak (e.g., on time for 5 days in a row).
- **Leveling System**:
  - **Progression**: Users accumulate XP to increase their "Employee Level" (e.g., Level 1: New Starter -> Level 10: Office Legend).
  - **Visual Cues**: Progress bars and level indicators on the User Dashboard.
- **Badges & Achievements**:
  - **Milestones**: Unlock badges for specific behaviors (e.g., "Early Bird" for 10 on-time arrivals, "Road Warrior" for 5 travel reimbursements).
  - **Profile Display**: Badges are displayed on the employee profile.
- **Leaderboard (Optional)**:
  - Weekly or monthly view of top "contributors" based on engagement points (can be toggled by HR to prevent toxicity).
