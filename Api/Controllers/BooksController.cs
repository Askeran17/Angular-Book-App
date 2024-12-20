using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private static List<Book> _inMemoryBooks = new List<Book>();

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("in-memory")]
        public IActionResult GetInMemoryBooks()
        {
            return Ok(_inMemoryBooks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            book.PublishDate = DateTime.SpecifyKind(book.PublishDate, DateTimeKind.Utc);
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Add to in-memory storage
            _inMemoryBooks.Add(book);

            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            book.PublishDate = DateTime.SpecifyKind(book.PublishDate, DateTimeKind.Utc);
            _context.Entry(book).State = EntityState.Modified;

            var inMemoryBook = _inMemoryBooks.Find(b => b.Id == id);
            if (inMemoryBook != null)
            {
                _inMemoryBooks.Remove(inMemoryBook);
                _inMemoryBooks.Add(book);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            _inMemoryBooks.RemoveAll(b => b.Id == id);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
