"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BookOpen, MapPin } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Navbar from './Navbar';

const sampleBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        condition: "Very Good",
        location: "New York, NY",
        owner: "John Doe",
        description: "A classic novel about the American Dream in the Roaring Twenties.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        condition: "Like New",
        location: "Los Angeles, CA",
        owner: "Jane Smith",
        description: "The epic science fiction masterpiece about a desert planet and its people.",
        image: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        condition: "Good",
        location: "Chicago, IL",
        owner: "Mike Johnson",
        description: "A brief history of humankind exploring how we became the dominant species.",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80"
    }
];

export default function BookSeekerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');

    const filteredBooks = sampleBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                        >
                            Find Your Next Read
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto"
                        >
                            Browse through books shared by our community and discover your next adventure
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row gap-4 mb-12"
                    >
                        <div className="flex-grow relative">
                            <Input
                                type="text"
                                placeholder="Search by title or author..."
                                className="pl-9 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Genres" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Genres</SelectItem>
                                <SelectItem value="Fiction">Fiction</SelectItem>
                                <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                                <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                                <SelectItem value="Mystery">Mystery</SelectItem>
                                <SelectItem value="Romance">Romance</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="cursor-pointer overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
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
                                            <span className="px-3 py-1 bg-secondary/10 rounded-full text-sm font-medium text-secondary">
                                                {book.condition}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{book.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            {book.location}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">
                                            Shared by {book.owner}
                                        </span>
                                        <Button>Request Book</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredBooks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-center py-16 text-muted-foreground"
                        >
                            <BookOpen className="h-20 w-20 mx-auto mb-6 opacity-50" />
                            <p className="text-xl font-medium mb-2">No books found matching your criteria</p>
                            <p className="text-muted-foreground">Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}