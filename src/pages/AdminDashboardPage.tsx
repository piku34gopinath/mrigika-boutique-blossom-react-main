
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, X } from "lucide-react";


interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string[];
    category: string;
    sizes: string[];
    colors: string[];
    featured?: boolean;
}

const categories = ['sarees', 'lehengas', 'customized', 'kids'];
const allSizes = ['Free Size', 'S', 'M', 'L', 'XL', '2-3 years', '4-5 years', '6-7 years', '8-9 years', 'Custom'];
const allColors = [
    'Royal Blue', 'Emerald Green', 'Deep Purple', 'Red', 'Orange', 'Yellow', 'Maroon', 'Gold', 'Green', 'White', 'Cream', 'Light Pink',
    'Golden Yellow', 'Bronze', 'Copper', 'Red Gold', 'Purple Gold', 'Green Gold', 'Purple', 'Teal', 'Magenta', 'Navy Blue', 'Emerald',
    'Burgundy', 'Silver', 'Rose Gold', 'Black', 'Yellow', 'Orange', 'Pink', 'Deep Red', 'Royal Gold', 'As per choice', 'Blue', 'Lavender',
    'Peach', 'Mint Green', 'Baby Pink', 'Floral Print', 'Polka Dots', 'Stripes'
];

const AdminDashboardPage = () => {
    const isAdmin = localStorage.getItem("admin") === "true";
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'image' | 'sizes' | 'colors'> & { imageFiles: File[], sizes: string[], colors: string[], id: string }>({
        id: '',
        name: '',
        price: 0,
        description: '',
        imageFiles: [],
        category: '',
        sizes: [],
        colors: [],
        featured: false,
    });
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [openSizes, setOpenSizes] = useState(false);
    const [openColors, setOpenColors] = useState(false);


    if (!isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    const handleLogout = () => {
        localStorage.removeItem("admin");
        window.location.href = "/admin/login";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setNewProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (name: keyof Product, value: string | boolean) => {
        setNewProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (name: 'sizes' | 'colors', item: string) => {
        setNewProduct(prev => {
            const currentItems = prev[name];
            const newItems = currentItems.includes(item)
                ? currentItems.filter(i => i !== item)
                : [...currentItems, item];
            return { ...prev, [name]: newItems };
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewProduct(prev => ({
                ...prev,
                imageFiles: [...prev.imageFiles, ...files],
            }));
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleDeleteImage = (index: number) => {
        setNewProduct(prev => {
            const newImageFiles = prev.imageFiles.filter((_, i) => i !== index);
            return { ...prev, imageFiles: newImageFiles };
        });
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Product:", {
            ...newProduct,
            image: newProduct.imageFiles.map(file => file.name),
        });
        setNewProduct({
            id: '',
            name: '',
            price: 0,
            description: '',
            imageFiles: [],
            category: '',
            sizes: [],
            colors: [],
            featured: false,
        });
        setImagePreviews([]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
                    <Button onClick={handleLogout} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200">
                        Logout
                    </Button>
                </div>
                <p className="mb-8 text-gray-600">Welcome to the admin dashboard. Here you can manage your store.</p>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-700">Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="id" className="text-gray-700 font-medium">Product ID</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        type="text"
                                        value={newProduct.id}
                                        onChange={handleInputChange}
                                        placeholder="Enter product ID"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="name" className="text-gray-700 font-medium">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={newProduct.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="price" className="text-gray-700 font-medium">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={newProduct.price}
                                        onChange={handleInputChange}
                                        placeholder="Enter price"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="image-upload" className="text-gray-700 font-medium">Product Images</Label>
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {imagePreviews.map((src, index) => (
                                            <div key={index} className="relative w-28 h-28 border border-gray-200 rounded-md overflow-hidden shadow-sm group">
                                                <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
                                                <Button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                    size="icon"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                                    <Select onValueChange={(value) => handleSelectChange('category', value)} value={newProduct.category}>
                                        <SelectTrigger id="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-gray-700 font-medium">Sizes</Label>
                                    <Popover open={openSizes} onOpenChange={setOpenSizes}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openSizes}
                                                className="w-full justify-between mt-1"
                                            >
                                                <div className="flex flex-wrap gap-1">
                                                    {newProduct.sizes.length > 0 ? (
                                                        newProduct.sizes.map(size => (
                                                            <Badge key={size} variant="secondary" className="pr-1">
                                                                {size}
                                                                <Button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleMultiSelectChange('sizes', size);
                                                                    }}
                                                                    className="ml-1 h-auto p-0 text-white bg-transparent hover:bg-transparent"
                                                                >
                                                                    <X className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                                                                </Button>
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        "Select sizes..."
                                                    )}
                                                </div>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandGroup>
                                                    {allSizes.map((size) => (
                                                        <CommandItem
                                                            key={size}
                                                            onSelect={() => handleMultiSelectChange('sizes', size)}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                checked={newProduct.sizes.includes(size)}
                                                                onCheckedChange={() => handleMultiSelectChange('sizes', size)}
                                                            />
                                                            <Label>{size}</Label>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Label className="text-gray-700 font-medium">Colors</Label>
                                    <Popover open={openColors} onOpenChange={setOpenColors}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openColors}
                                                className="w-full justify-between mt-1"
                                            >
                                                <div className="flex flex-wrap gap-1">
                                                    {newProduct.colors.length > 0 ? (
                                                        newProduct.colors.map(color => (
                                                            <Badge key={color} variant="secondary" className="pr-1">
                                                                {color}
                                                                <Button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleMultiSelectChange('colors', color);
                                                                    }}
                                                                    className="ml-1 h-auto p-0 text-white bg-transparent hover:bg-transparent"
                                                                >
                                                                    <X className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                                                                </Button>
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        "Select colors..."
                                                    )}
                                                </div>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                            <Command>
                                                <CommandGroup>
                                                    {allColors.map((color) => (
                                                        <CommandItem
                                                            key={color}
                                                            onSelect={() => handleMultiSelectChange('colors', color)}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                checked={newProduct.colors.includes(color)}
                                                                onCheckedChange={() => handleMultiSelectChange('colors', color)}
                                                            />
                                                            <Label>{color}</Label>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="featured"
                                        name="featured"
                                        checked={newProduct.featured}
                                        onCheckedChange={(checked) => handleSelectChange('featured', checked as boolean)}
                                    />
                                    <Label htmlFor="featured" className="text-gray-700 font-medium">Featured Product</Label>
                                </div>
                                <Button type="submit" className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200">
                                    Add Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
