"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    condition: string;
    description: string;
}

export default function OwnerDashboard() {
    const [books, setBooks] = useState<Book[]>([]);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newBook = {
            id: Date.now(),
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            genre: formData.get('genre') as string,
            condition: formData.get('condition') as string,
            description: formData.get('description') as string,
        };
        setBooks([...books, newBook]);
        setShowForm(false);
        e.currentTarget.reset();
    };

    return (
        <>
            <Navbar />
            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
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
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Author</label>
                                        <input
                                            type="text"
                                            name="author"
                                            required
                                            className="w-full p-2 rounded-md border border-input bg-background"
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
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        className="w-full p-2 rounded-md border border-input bg-background"
                                    ></textarea>
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

                    <div className="grid gap-6">
                        {books.map((book) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-card p-6 rounded-lg shadow-lg flex items-start gap-4"
                            >
                                <div className="flex-shrink-0">
                                    <BookOpen className="h-12 w-12 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold">{book.title}</h3>
                                    <p className="text-muted-foreground">by {book.author}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                                            {book.genre}
                                        </span>
                                        <span className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                                            {book.condition}
                                        </span>
                                    </div>
                                    <p className="mt-2">{book.description}</p>
                                </div>
                            </motion.div>
                        ))}

                        {books.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
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