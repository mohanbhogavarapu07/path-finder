# Assessment Start Popup Implementation

## Overview
This implementation adds a popup dialog that appears when users click the "Start Assessment" button on any assessment card. The popup collects user information (name, email, and age) before redirecting to the assessment.

## Changes Made

### 1. Created Dialog Component
- **File**: `src/components/ui/dialog.tsx`
- **Purpose**: Reusable dialog component using Radix UI
- **Features**: 
  - Responsive design
  - Keyboard navigation support
  - Focus management
  - Accessibility features

### 2. Created Assessment Start Dialog
- **File**: `src/components/AssessmentStartDialog.tsx`
- **Purpose**: Specific dialog for collecting user information before starting assessments
- **Features**:
  - Form validation for name, email, and age
  - Error handling and display
  - Data storage in localStorage
  - Navigation to assessment after successful submission

### 3. Modified Assessment Card
- **File**: `src/components/AssessmentCard.tsx`
- **Changes**:
  - Replaced direct navigation with dialog trigger
  - Added state management for dialog visibility
  - Integrated AssessmentStartDialog component

## Features

### Form Validation
- **Name**: Required field
- **Email**: Required field with email format validation
- **Age**: Required field with range validation (1-120)

### User Experience
- Real-time error clearing when user starts typing
- Clear error messages for each field
- Responsive design that works on mobile and desktop
- Consistent styling with the existing FactorBeam theme

### Data Persistence
- User data is stored in localStorage as 'assessmentUserData'
- Data can be accessed by assessment components if needed

## Usage

When a user clicks "Start Assessment" on any assessment card:

1. A popup dialog appears with input fields for name, email, and age
2. User fills in the required information
3. Form validates the input and shows errors if any
4. Upon successful validation, user data is stored and user is redirected to the assessment
5. If validation fails, error messages are displayed

## Technical Details

### Dependencies Used
- `@radix-ui/react-dialog` - For the dialog component
- `react-router-dom` - For navigation
- Existing UI components (Button, Input, Label)

### Styling
- Uses existing FactorBeam CSS classes for consistent theming
- Responsive design with Tailwind CSS
- Error states with red borders and text

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Future Enhancements
- Add option to remember user data for future assessments
- Add privacy policy and terms acceptance
- Add progress tracking
- Add analytics for user engagement
