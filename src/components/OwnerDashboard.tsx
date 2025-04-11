"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

export interface Book {
    id: string;
    title: string;
    author: string;
    genre?: string;
    location?: string;
    contact: string;
    status: string;
    image?: string;
    owner?: {
        name: string;
    };
    ownerId?: string;
}

export default function OwnerDashboard() {
    const [books, setBooks] = useState<Book[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        location: '',
        contact: '',
        status: '',
    });
    const fetchBooks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
        const data = await response.json();
        setBooks(data);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> |
        React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newBook = {
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            location: formData.location,
            contact: formData.contact,
            status: formData.status
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, newBook, {
            withCredentials: true
        });
        console.log(res);
        if (res.status === 200) {
            setShowForm(false);
            fetchBooks();
        }
    };
    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`, {
                withCredentials: true
            });
            if (res.status === 200) {
                fetchBooks();
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEdit = (book: Book) => {
        setFormData({
            title: book.title,
            author: book.author,
            genre: book.genre || '',
            location: book.location || '',
            contact: book.contact,
            status: book.status,
        });
        setShowForm(true);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <Navbar />
            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Your Book Collection</h1>
                            <p className="text-muted-foreground">Share your books with the community</p>
                        </div>
                        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5" />
                            Add New Book
                        </Button>
                    </div>

                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card p-6 rounded-lg shadow-lg mb-8"
                        >
                            <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Author</label>
                                        <input
                                            type="text"
                                            name="author"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Genre</label>
                                        <select
                                            name="genre"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Genre</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non-Fiction">Non-Fiction</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Science Fiction">Science Fiction</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Biography">Biography</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Condition</label>
                                        <select
                                            name="condition"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Condition</option>
                                            <option value="New">New</option>
                                            <option value="Like New">Like New</option>
                                            <option value="Very Good">Very Good</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Contact</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Status</label>
                                        <select
                                            name="status"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="AVAILABLE">Available</option>
                                            <option value="UNAVAILABLE">Unavailable</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            rows={3}
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Add Book</Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden bg-primary/10">
                                        {book.image ? (
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen className="h-20 w-20 text-primary/60" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <CardHeader>
                                        <h3 className="text-xl font-semibold line-clamp-1">{book.title}</h3>
                                        <p className="text-muted-foreground">by {book.author}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                                                {book.genre}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${book.status === 'AVAILABLE'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {book.status === 'AVAILABLE' ? 'Available' : 'Unavailable'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            {book.location}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">
                                            Contact: {book.contact}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEdit(book)}
                                                className="h-8 w-8"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(book.id)}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}

                        {books.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground col-span-3">
                                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">You haven't added any books yet.</p>
                                <p>Click the "Add New Book" button to get started!</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
}