# Admin Dashboard Design System

## Overview

The Admin Dashboard is now fully aligned with the frontend design system, using consistent colors, typography, and component patterns throughout.

## Color Palette (from tailwind.config.js)

| Name             | Value     | Usage                                               |
| ---------------- | --------- | --------------------------------------------------- |
| **theme**        | `#8F8933` | Primary brand color, buttons, accents, hover states |
| **primary**      | `#3C3C3B` | Main text color (dark)                              |
| **secondary**    | `#fff`    | White backgrounds, light text on dark               |
| **tertiary**     | `#6d6c74` | Secondary text, labels, helper text                 |
| **quaternary**   | `#F4F4F5` | Light background, hover states                      |
| **static**       | `#1A1A34` | Sidebar background                                  |
| **themeDeep**    | `#978C21` | Darker theme variant for hover/active               |
| **lightThemeBg** | `#E5F2FF` | Light blue background for light variants            |
| **buttonHover**  | `#e89405` | Button hover state                                  |

## Typography

- **Font Family**: Montserrat (var: `font-primary`)
- **Font Sizes**:
  - Headings: 2xl, xl, lg
  - Body: sm, base
  - Labels: xs, sm
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Reusable Components

### Buttons

#### AdminPrimaryButton

Main action button with theme background.

```jsx
import AdminPrimaryButton from "@/Layout/Button/AdminPrimaryButton";

<AdminPrimaryButton
  text="Save"
  onClick={handleSave}
  icon={MdSave}
  loading={isLoading}
/>;
```

**Props:**

- `text` (string): Button label
- `onClick` (function): Click handler
- `icon` (component): Icon to display
- `disabled` (boolean): Disable button
- `loading` (boolean): Show loading spinner
- `className` (string): Additional Tailwind classes

#### AdminSecondaryButton

Outline button for secondary actions.

```jsx
<AdminSecondaryButton text="Cancel" onClick={handleCancel} icon={MdClose} />
```

#### AdminDangerButton

Red button for destructive actions.

```jsx
<AdminDangerButton text="Delete" onClick={handleDelete} icon={MdDelete} />
```

### Form Inputs

#### AdminInput

Text input with validation and error display.

```jsx
import AdminInput from "@/Layout/Input/AdminInput";

<AdminInput
  label="Product Name"
  name="name"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  placeholder="Enter product name"
  required
  error={errors.name}
  type="text"
/>;
```

**Props:**

- `label` (string): Input label
- `name` (string): Input name
- `value` (string): Input value
- `onChange` (function): Change handler
- `placeholder` (string): Placeholder text
- `required` (boolean): Show required asterisk
- `error` (string): Error message
- `disabled` (boolean): Disable input
- `type` (string): Input type (text, email, number, etc.)
- `className` (string): Additional classes

#### AdminTextarea

Multi-line text input.

```jsx
import AdminTextarea from "@/Layout/Input/AdminTextarea";

<AdminTextarea
  label="Description"
  name="description"
  value={formData.description}
  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
  rows={5}
  required
  error={errors.description}
/>;
```

#### AdminSelect

Dropdown select input.

```jsx
import AdminSelect from "@/Layout/Input/AdminSelect";

<AdminSelect
  label="Status"
  name="status"
  value={formData.status}
  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]}
  required
  error={errors.status}
/>;
```

### Cards & Containers

#### AdminCard

Reusable card container for grouped content.

```jsx
import AdminCard from "@/Layout/Card/AdminCard";

<AdminCard
  title="Product Details"
  subtitle="Edit product information"
  actions={
    <div className="flex gap-2">
      <AdminPrimaryButton text="Save" onClick={handleSave} />
      <AdminSecondaryButton text="Cancel" onClick={handleCancel} />
    </div>
  }
>
  <AdminInput
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <AdminTextarea
    label="Description"
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
  />
</AdminCard>;
```

**Props:**

- `title` (string): Card title
- `subtitle` (string): Card subtitle
- `children` (ReactNode): Card content
- `actions` (ReactNode): Footer action buttons
- `className` (string): Additional classes

### Badges

#### AdminBadge

Status badge with multiple color variants.

```jsx
import AdminBadge from '@/Layout/Badge/AdminBadge';

<AdminBadge text="Active" variant="success" />
<AdminBadge text="Pending" variant="warning" />
<AdminBadge text="Inactive" variant="danger" />
<AdminBadge text="Draft" variant="secondary" />
```

**Props:**

- `text` (string): Badge text
- `variant` (string): Color variant
  - `primary` (theme blue/green)
  - `success` (green)
  - `warning` (yellow)
  - `danger` (red)
  - `secondary` (gray)
  - `info` (light blue)
- `className` (string): Additional classes

## Layout Components

### AdminLayout

Main layout wrapper with sidebar navigation and top bar.

- **Sidebar**: Collapsible navigation with theme colors
- **Top Bar**: User menu with profile/logout options
- **Main Content**: Outlet for page content

### DataTable

Reusable table component with search, edit, delete, and view actions.

```jsx
<DataTable
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (val) => <AdminBadge text={val} />,
    },
  ]}
  data={items}
  searchValue={search}
  onSearch={setSearch}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={handleView}
  loading={isLoading}
/>
```

### Modal

Reusable modal dialog with consistent styling.

```jsx
import Modal from "@/Components/Admin/Modal";

<Modal isOpen={isOpen} title="Confirm Delete" onClose={handleClose} size="md">
  <p>Are you sure you want to delete this item?</p>
  <div className="mt-6 flex gap-2 justify-end">
    <AdminSecondaryButton text="Cancel" onClick={handleClose} />
    <AdminDangerButton text="Delete" onClick={handleDelete} />
  </div>
</Modal>;
```

## Example: Complete Product Create/Edit Form

```jsx
import React, { useState } from "react";
import AdminCard from "@/Layout/Card/AdminCard";
import AdminInput from "@/Layout/Input/AdminInput";
import AdminTextarea from "@/Layout/Input/AdminTextarea";
import AdminSelect from "@/Layout/Input/AdminSelect";
import AdminPrimaryButton from "@/Layout/Button/AdminPrimaryButton";
import AdminSecondaryButton from "@/Layout/Button/AdminSecondaryButton";

const ProductForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard
        title="Product Information"
        subtitle="Fill in the product details below"
        actions={
          <div className="flex gap-2 ml-auto">
            <AdminSecondaryButton text="Cancel" onClick={onCancel} />
            <AdminPrimaryButton text="Save Product" loading={loading} />
          </div>
        }
      >
        <AdminInput
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          error={errors.name}
        />

        <AdminTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={4}
          required
          error={errors.description}
        />

        <AdminInput
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          error={errors.price}
        />

        <AdminSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "draft", label: "Draft" },
          ]}
        />
      </AdminCard>
    </form>
  );
};

export default ProductForm;
```

## Design System Alignment Checklist

✅ **Colors**: All components use brand color palette
✅ **Typography**: All text uses Montserrat font-primary
✅ **Spacing**: Consistent 4px grid spacing
✅ **Borders**: Theme-colored borders with opacity variants
✅ **Shadows**: Subtle shadows for depth (shadow-md, shadow-lg)
✅ **Border Radius**: Consistent 8px (rounded-lg) throughout
✅ **Hover States**: Theme color on hover with smooth transitions
✅ **Focus States**: Clear focus rings for accessibility
✅ **Disabled States**: Opacity 50% with cursor-not-allowed
✅ **Error States**: Red color (#EF4444) for validation errors
✅ **Responsive**: Mobile-first approach with responsive padding/sizing

## Migration Guide for Existing Pages

### Before (using gray tones)

```jsx
<button className="bg-gray-600 hover:bg-gray-700 text-white">Save</button>
<input className="border border-gray-300 focus:border-blue-500" />
```

### After (using brand colors)

```jsx
<AdminPrimaryButton text="Save" onClick={handleSave} />
<AdminInput label="Field" value={value} onChange={handleChange} />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Dark mode support
- Custom theme variants
- Advanced table features (sorting, pagination, filtering)
- Rich text editor integration
- File upload components
- Date/time pickers
