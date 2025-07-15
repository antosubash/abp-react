---
sidebar_position: 4
---

# Creating CRUD Pages with Authentication

This tutorial demonstrates how to create complete CRUD (Create, Read, Update, Delete) pages with authentication and permission controls using a Product entity as an example.

## Overview

We'll build a complete product management system that includes:

- **Product List Page**: Display products with search, pagination, and actions
- **Product Create Page**: Form to add new products
- **Product Edit Page**: Form to update existing products
- **Product Details Page**: View detailed product information
- **Permission-based Access**: Role-based access control for all operations
- **Authentication Protection**: Secure all routes and actions

## Prerequisites

Before starting, ensure you have:

- ABP React project set up and running
- ABP backend with Product entity and API endpoints
- Understanding of React, TypeScript, and Next.js basics
- Familiarity with the project structure

## Step 1: Define Types and Interfaces

First, let's define the TypeScript interfaces for our Product entity.

### Create Type Definitions

```typescript
// src/types/product.ts
export interface ProductDto {
  id: string
  name: string
  description?: string
  price: number
  sku: string
  categoryId?: string
  category?: CategoryDto
  isActive: boolean
  stockQuantity: number
  imageUrl?: string
  creationTime: Date
  lastModificationTime?: Date
  creatorId?: string
  lastModifierId?: string
}

export interface CreateProductDto {
  name: string
  description?: string
  price: number
  sku: string
  categoryId?: string
  isActive: boolean
  stockQuantity: number
  imageUrl?: string
}

export interface UpdateProductDto {
  name: string
  description?: string
  price: number
  sku: string
  categoryId?: string
  isActive: boolean
  stockQuantity: number
  imageUrl?: string
}

export interface ProductListDto {
  items: ProductDto[]
  totalCount: number
}

export interface CategoryDto {
  id: string
  name: string
  description?: string
}

// Filter and pagination types
export interface GetProductsInput {
  skipCount?: number
  maxResultCount?: number
  sorting?: string
  keyword?: string
  categoryId?: string
  isActive?: boolean
  minPrice?: number
  maxPrice?: number
}
```

### Add Permissions

```typescript
// src/lib/utils.ts (add to existing Permissions object)
export const Permissions = {
  // ... existing permissions
  PRODUCTS_VIEW: 'Products.View',
  PRODUCTS_CREATE: 'Products.Create',
  PRODUCTS_UPDATE: 'Products.Update',
  PRODUCTS_DELETE: 'Products.Delete',
  PRODUCTS_MANAGE: 'Products.Manage',
}
```

## Step 2: Create API Hooks

Create custom hooks for API operations following the existing patterns.

### API Service Hook

```typescript
// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QueryNames } from './QueryConstants'
import type { 
  ProductDto, 
  CreateProductDto, 
  UpdateProductDto, 
  GetProductsInput,
  ProductListDto 
} from '@/types/product'

// Note: These would be generated API functions from your OpenAPI client
// For this example, we'll assume they exist in your client
import { 
  productGetList,
  productGet,
  productCreate,
  productUpdate,
  productDelete
} from '@/client'

// List products with pagination and filtering
export const useProducts = (input: GetProductsInput = {}) => {
  return useQuery({
    queryKey: [QueryNames.GetProducts, input],
    queryFn: async () => {
      const response = await productGetList({ query: input })
      return response.data as ProductListDto
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [QueryNames.GetProduct, id],
    queryFn: async () => {
      const response = await productGet({ path: { id } })
      return response.data as ProductDto
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateProductDto) => {
      const response = await productCreate({ body: input })
      return response.data as ProductDto
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetProducts] })
      toast.success(`Product "${data.name}" created successfully`)
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create product')
    },
  })
}

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateProductDto }) => {
      const response = await productUpdate({ path: { id }, body: input })
      return response.data as ProductDto
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetProducts] })
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetProduct, data.id] })
      toast.success(`Product "${data.name}" updated successfully`)
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update product')
    },
  })
}

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await productDelete({ path: { id } })
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryNames.GetProducts] })
      toast.success('Product deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete product')
    },
  })
}
```

### Query Constants

```typescript
// src/hooks/QueryConstants.ts (add to existing)
export const QueryNames = {
  // ... existing constants
  GetProducts: 'GetProducts',
  GetProduct: 'GetProduct',
  GetCategories: 'GetCategories',
}
```

## Step 3: Create CRUD Components

Build the UI components for product management.

### Product List Component

```typescript
// src/components/product/ProductList.tsx
'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Eye, Pencil, Trash, Plus } from 'lucide-react'

import { useProducts, useDeleteProduct } from '@/hooks/useProducts'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'
import type { ProductDto } from '@/types/product'

import { CustomTable } from '@/components/ui/CustomTable'
import { Search } from '@/components/ui/Search'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PermissionActions } from '@/components/permission/PermissionActions'
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'

type ProductActionDialogState = {
  productId: string
  productName: string
  dialogType: 'delete'
} | null

export const ProductList = () => {
  const router = useRouter()
  const { can } = useGrantedPolicies()
  const deleteProductMutation = useDeleteProduct()

  const [searchStr, setSearchStr] = useState<string>('')
  const [productActionDialog, setProductActionDialog] = useState<ProductActionDialogState>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, error } = useProducts({
    skipCount: pagination.pageIndex * pagination.pageSize,
    maxResultCount: pagination.pageSize,
    keyword: searchStr || undefined,
  })

  const handleActionComplete = () => {
    setProductActionDialog(null)
  }

  const handleDelete = async () => {
    if (productActionDialog?.dialogType === 'delete') {
      await deleteProductMutation.mutateAsync(productActionDialog.productId)
      handleActionComplete()
    }
  }

  const columns = useMemo(() => getProductColumns({
    onView: (product) => router.push(`/admin/products/${product.id}`),
    onEdit: (product) => router.push(`/admin/products/${product.id}/edit`),
    onDelete: (product) => setProductActionDialog({
      productId: product.id,
      productName: product.name,
      dialogType: 'delete'
    }),
    canView: can(Permissions.PRODUCTS_VIEW),
    canEdit: can(Permissions.PRODUCTS_UPDATE),
    canDelete: can(Permissions.PRODUCTS_DELETE),
  }), [can, router])

  const table = useReactTable({
    data: data?.items ?? [],
    pageCount: Math.ceil((data?.totalCount ?? 0) / pagination.pageSize),
    state: { pagination },
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  })

  if (isLoading) return <Loader />
  if (error) return <Error />

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        {can(Permissions.PRODUCTS_CREATE) && (
          <Button onClick={() => router.push('/admin/products/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        )}
      </div>

      {/* Search */}
      <Search 
        onUpdate={setSearchStr} 
        value={searchStr}
        placeholder="Search products..."
      />

      {/* Table */}
      <CustomTable<ProductDto>
        table={table}
        totalCount={data?.totalCount ?? 0}
        pageSize={pagination.pageSize}
      />

      {/* Delete Dialog */}
      {productActionDialog?.dialogType === 'delete' && (
        <DeleteConfirmDialog
          isOpen={true}
          onClose={handleActionComplete}
          onConfirm={handleDelete}
          title="Delete Product"
          description={`Are you sure you want to delete "${productActionDialog.productName}"? This action cannot be undone.`}
          isLoading={deleteProductMutation.isPending}
        />
      )}
    </div>
  )
}

// Column definitions
const getProductColumns = (actions: {
  onView: (product: ProductDto) => void
  onEdit: (product: ProductDto) => void
  onDelete: (product: ProductDto) => void
  canView: boolean
  canEdit: boolean
  canDelete: boolean
}): ColumnDef<ProductDto>[] => [
  {
    header: 'Product Management',
    columns: [
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <PermissionActions
            actions={[
              {
                icon: 'eye',
                label: 'View',
                visible: actions.canView,
                callback: () => actions.onView(row.original),
              },
              {
                icon: 'pencil',
                label: 'Edit',
                visible: actions.canEdit,
                callback: () => actions.onEdit(row.original),
              },
              {
                icon: 'trash',
                label: 'Delete',
                visible: actions.canDelete,
                callback: () => actions.onDelete(row.original),
              },
            ]}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.sku}</div>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">
            {row.original.description || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
          <div className="font-medium">
            ${row.original.price.toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: 'stockQuantity',
        header: 'Stock',
        cell: ({ row }) => (
          <Badge variant={row.original.stockQuantity > 0 ? 'default' : 'destructive'}>
            {row.original.stockQuantity}
          </Badge>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => row.original.category?.name || '-',
      },
    ],
  },
]
```

### Product Form Component

```typescript
// src/components/product/ProductForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts'
import type { ProductDto, CreateProductDto, UpdateProductDto } from '@/types/product'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(256, 'Name is too long'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  sku: z.string().min(1, 'SKU is required').max(64, 'SKU is too long'),
  categoryId: z.string().optional(),
  isActive: z.boolean(),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative'),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: ProductDto
  mode: 'create' | 'edit'
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, mode }) => {
  const router = useRouter()
  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      sku: product?.sku || '',
      categoryId: product?.categoryId || '',
      isActive: product?.isActive ?? true,
      stockQuantity: product?.stockQuantity || 0,
      imageUrl: product?.imageUrl || '',
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (mode === 'create') {
        await createProductMutation.mutateAsync(data as CreateProductDto)
      } else if (product) {
        await updateProductMutation.mutateAsync({
          id: product.id,
          input: data as UpdateProductDto,
        })
      }
      router.push('/admin/products')
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  const isLoading = createProductMutation.isPending || updateProductMutation.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          {mode === 'create' ? 'Create Product' : 'Edit Product'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'create' 
            ? 'Add a new product to your catalog' 
            : 'Update product information'
          }
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic product details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter product description"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU</FormLabel>
                          <FormControl>
                            <Input placeholder="Product SKU" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Side Information */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                  <CardDescription>
                    Configure inventory and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active Status</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Make this product available for sale
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push('/admin/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
```

### Product Details Component

```typescript
// src/components/product/ProductDetails.tsx
'use client'
import { useRouter } from 'next/navigation'
import { Pencil, ArrowLeft } from 'lucide-react'

import { useProduct } from '@/hooks/useProducts'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Permissions } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'

interface ProductDetailsProps {
  productId: string
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const router = useRouter()
  const { can } = useGrantedPolicies()
  const { data: product, isLoading, error } = useProduct(productId)

  if (isLoading) return <Loader />
  if (error) return <Error />
  if (!product) return <div>Product not found</div>

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => router.push('/admin/products')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Product Details</p>
          </div>
        </div>
        {can(Permissions.PRODUCTS_UPDATE) && (
          <Button onClick={() => router.push(`/admin/products/${product.id}/edit`)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Product
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm">{product.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p className="text-sm font-mono">{product.sku}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm mt-1">{product.description || 'No description provided'}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock</label>
                  <p className="text-lg font-semibold">{product.stockQuantity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>

              {product.category && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="text-sm">{product.category.name}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {product.imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="max-w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Metadata */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>Creation and modification information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created</label>
                <p className="text-sm">{formatDate(product.creationTime)}</p>
              </div>
              
              {product.lastModificationTime && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                  <p className="text-sm">{formatDate(product.lastModificationTime)}</p>
                </div>
              )}

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground">Product ID</label>
                <p className="text-xs font-mono break-all">{product.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

## Step 4: Create Pages with Authentication

Now let's create the actual pages with proper authentication and routing.

### Product List Page

```typescript
// src/app/admin/products/page.tsx
import { Metadata } from 'next'
import { ProductList } from '@/components/product/ProductList'
import { PermissionGuard } from '@/components/auth/PermissionGuard'
import { Permissions } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Products | Admin',
  description: 'Manage your product catalog',
}

export default function ProductsPage() {
  return (
    <PermissionGuard permission={Permissions.PRODUCTS_VIEW}>
      <div className="container mx-auto p-6">
        <ProductList />
      </div>
    </PermissionGuard>
  )
}
```

### Create Product Page

```typescript
// src/app/admin/products/create/page.tsx
import { Metadata } from 'next'
import { ProductForm } from '@/components/product/ProductForm'
import { PermissionGuard } from '@/components/auth/PermissionGuard'
import { Permissions } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Create Product | Admin',
  description: 'Add a new product to your catalog',
}

export default function CreateProductPage() {
  return (
    <PermissionGuard permission={Permissions.PRODUCTS_CREATE}>
      <div className="container mx-auto p-6">
        <ProductForm mode="create" />
      </div>
    </PermissionGuard>
  )
}
```

### Product Details Page

```typescript
// src/app/admin/products/[id]/page.tsx
import { Metadata } from 'next'
import { ProductDetails } from '@/components/product/ProductDetails'
import { PermissionGuard } from '@/components/auth/PermissionGuard'
import { Permissions } from '@/lib/utils'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Product Details | Admin',
  description: 'View product information',
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <PermissionGuard permission={Permissions.PRODUCTS_VIEW}>
      <div className="container mx-auto p-6">
        <ProductDetails productId={params.id} />
      </div>
    </PermissionGuard>
  )
}
```

### Edit Product Page

```typescript
// src/app/admin/products/[id]/edit/page.tsx
'use client'
import { ProductForm } from '@/components/product/ProductForm'
import { PermissionGuard } from '@/components/auth/PermissionGuard'
import { useProduct } from '@/hooks/useProducts'
import { Permissions } from '@/lib/utils'
import Error from '@/components/ui/Error'
import Loader from '@/components/ui/Loader'

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { data: product, isLoading, error } = useProduct(params.id)

  if (isLoading) return <Loader />
  if (error) return <Error />
  if (!product) return <div>Product not found</div>

  return (
    <PermissionGuard permission={Permissions.PRODUCTS_UPDATE}>
      <div className="container mx-auto p-6">
        <ProductForm mode="edit" product={product} />
      </div>
    </PermissionGuard>
  )
}
```

## Step 5: Create Permission Guard Component

Create a reusable permission guard component for protecting pages and components.

```typescript
// src/components/auth/PermissionGuard.tsx
'use client'
import { useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { AccessDenied } from './AccessDenied'
import Loader from '@/components/ui/Loader'

interface PermissionGuardProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  fallback 
}) => {
  const { can, isLoading } = useGrantedPolicies()

  if (isLoading) {
    return <Loader />
  }

  if (!can(permission)) {
    return fallback || <AccessDenied />
  }

  return <>{children}</>
}
```

### Access Denied Component

```typescript
// src/components/auth/AccessDenied.tsx
import { ShieldX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldX className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Step 6: Add Navigation Menu

Update the admin menu to include the new product management section.

```typescript
// src/config.ts (update AdminMenus)
import { Package } from 'lucide-react'

export const AdminMenus: Array<{ 
  name: string; 
  link: string; 
  icon: React.ComponentType; 
  submenus?: Array<{ name: string; link: string; icon: React.ComponentType; }>;
}> = [
  // ... existing menus
  {
    name: 'Products',
    link: '/admin/products',
    icon: Package,
  },
  // ... rest of menus
]
```

## Step 7: Error Handling and Loading States

### Custom Error Boundary

```typescript
// src/components/ui/ErrorBoundary.tsx
'use client'
import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>
                An unexpected error occurred. Please try again.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => this.setState({ hasError: false, error: undefined })}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Delete Confirmation Dialog

```typescript
// src/components/ui/DeleteConfirmDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  isLoading?: boolean
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Step 8: Testing and Best Practices

### Testing Permissions

```typescript
// src/components/product/__tests__/ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductList } from '../ProductList'

// Mock the permission hook
jest.mock('@/lib/hooks/useGrantedPolicies', () => ({
  useGrantedPolicies: () => ({
    can: jest.fn().mockReturnValue(true),
    isLoading: false,
  }),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('ProductList', () => {
  it('renders product list with proper permissions', async () => {
    render(<ProductList />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Create Product')).toBeInTheDocument()
    })
  })

  it('hides create button when user lacks permission', async () => {
    // Mock permission to return false
    jest.mocked(useGrantedPolicies).mockReturnValue({
      can: jest.fn().mockReturnValue(false),
      isLoading: false,
    })

    render(<ProductList />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.queryByText('Create Product')).not.toBeInTheDocument()
    })
  })
})
```

### Performance Optimization

```typescript
// src/components/product/ProductList.tsx (optimization example)
import { memo, useMemo, useCallback } from 'react'

// Memoize column definitions
const getProductColumns = memo((actions: ActionHandlers) => {
  // ... column definitions
})

// Memoize action handlers
export const ProductList = () => {
  const handleView = useCallback((product: ProductDto) => {
    router.push(`/admin/products/${product.id}`)
  }, [router])

  const handleEdit = useCallback((product: ProductDto) => {
    router.push(`/admin/products/${product.id}/edit`)
  }, [router])

  const handleDelete = useCallback((product: ProductDto) => {
    setProductActionDialog({
      productId: product.id,
      productName: product.name,
      dialogType: 'delete'
    })
  }, [])

  // ... rest of component
}
```

## Best Practices Summary

### 1. Security
- Always use `PermissionGuard` for page-level protection
- Check permissions in components for conditional rendering
- Validate data on both client and server sides
- Use proper error boundaries

### 2. Performance
- Implement proper caching with React Query
- Use memoization for expensive calculations
- Implement pagination for large datasets
- Optimize re-renders with `useCallback` and `useMemo`

### 3. User Experience
- Provide loading states for all async operations
- Show clear error messages and recovery options
- Implement optimistic updates where appropriate
- Use toast notifications for user feedback

### 4. Code Organization
- Follow consistent naming conventions
- Separate concerns (hooks, components, types)
- Use TypeScript for type safety
- Write comprehensive tests

### 5. Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## Conclusion

This tutorial demonstrated how to create a complete CRUD interface with authentication and permissions. The patterns shown here can be applied to any entity in your ABP React application:

1. **Define TypeScript interfaces** for your entity
2. **Create API hooks** for data operations
3. **Build reusable components** following established patterns
4. **Implement pages** with proper routing and guards
5. **Add permission controls** at multiple levels
6. **Test thoroughly** and optimize for performance

By following these patterns, you can quickly scaffold new features while maintaining consistency, security, and performance across your application.

## Next Steps

- **[Permission Management](/docs/fundamentals/permissions)** - Deep dive into ABP's permission system
- **[Form Validation](/docs/components/forms)** - Advanced form handling techniques
- **[Testing Guide](/docs/development/testing)** - Comprehensive testing strategies
- **[Performance Optimization](/docs/development/performance)** - Advanced optimization techniques
</rewritten_file>