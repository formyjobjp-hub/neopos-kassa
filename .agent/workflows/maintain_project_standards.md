---
description: Update Project Standards Documentation with User Approval
---

This workflow guides you through updating the `PROJECT_STANDARDS.md` file when significant architectural changes or new patterns are introduced.

1.  **Analyze Recent Changes**:
    *   Review the code changes made in the current session or task.
    *   Identify any new libraries, directory structures, naming conventions, or UI patterns (e.g., "We decided to use X for state management").

2.  **Compare with Existing Standards**:
    *   Read `PROJECT_STANDARDS.md`.
    *   Check if the new patterns conflict with existing rules or if they are completely new additions.

3.  **Draft Proposed Changes**:
    *   Formulate the exact text you want to add or modify in `PROJECT_STANDARDS.md`.
    *   Ensure the language is clear and consistent with the existing document.

4.  **Request User Approval (CRITICAL)**:
    *   You **MUST** ask the user for permission before modifying the standards file.
    *   Present the summary of changes: "Men loyiha standartlariga quyidagi o'zgarishlarni kiritmoqchiman..."
    *   Show the proposed additions/changes.
    *   Ask: "Ruhsat berasizmi?" or "Tasdiqlaysizmi?"

5.  **Apply Changes**:
    *   **IF AND ONLY IF** the user approves (says "Ha", "Ok", "Mayli"), use `replace_file_content` or `write_to_file` to update `PROJECT_STANDARDS.md`.
    *   If the user rejects, discard the changes or ask for clarification.

6.  **Confirm**:
    *   Notify the user that the standards have been updated successfully.
