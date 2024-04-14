---
sidebar_position: 1
---

# Create a Page

This guide will explain how to create a page in ABP React.

Abp React uses Next.js Page system to create pages. You can create a new page by creating a new file in the `pages` directory of the project. The file should be a `.tsx` file and should export a React component.

## Creating a new page

To create a new page, follow these steps:

1. Create a new file in the `pages` directory of the project.
2. The file should be a `.tsx` file.
3. The file should export a React component.
4. You can use the `useRouter` hook from Next.js to get the current route.
5. You can use the hooks from the `@abpreact/hooks` package to get the current user and the current tenant.

Here is an example of a simple page:

```tsx
import { useRouter } from "next/router";
import { useCurrentUser } from "@abpreact/hooks";

export default function MyPage() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <div>
      <h1>My Page</h1>
      <p>Current Route: {router.pathname}</p>
      <p>Current User: {currentUser?.userName}</p>
    </div>
  );
}
```

Now you can access the page by visiting the route in the browser. For example, if the file is named `my-page.tsx`, you can access the page by visiting [http://localhost:3000/my-page](http://localhost:3000/my-page).

## Next Steps

Now that you have created a page, you can start adding more functionality to it. You can use the hooks from the `@abpreact/hook` package to get the current user and the current tenant. You can also use the hooks from the `@abpreact/ui` package to add UI components to the page.
