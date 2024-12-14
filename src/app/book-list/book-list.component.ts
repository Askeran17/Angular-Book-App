import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  inMemoryBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadBooks();
      this.loadInMemoryBooks();
    }
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  loadInMemoryBooks(): void {
    this.bookService.getInMemoryBooks().subscribe((books) => {
      this.inMemoryBooks = books;
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/book-form']);
  }

  editBook(id: number): void {
    this.router.navigate(['/book-form', id]);
  }

  deleteBook(id: number | undefined): void {
    if (id !== undefined) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book.id !== id);
        this.inMemoryBooks = this.inMemoryBooks.filter(book => book.id !== id);
      });
    }
  }
}
