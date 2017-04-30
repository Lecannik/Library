package net.library.spring.controller;

import java.util.List;

import net.library.spring.dao.BooksDAO;
import net.library.spring.model.Books;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BooksRestController {


	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(BooksRestController.class);
	
	@Autowired
	private BooksDAO booksDAO;

	@Transactional
	@GetMapping("/books")
	public List getCustomers() {
		return booksDAO.listBooks();
	}


	@Transactional
	@PostMapping(value = "/addbook")
	public ResponseEntity createCustomer(@RequestBody Books book) {




		booksDAO.addBook(book);





		return new ResponseEntity(book, HttpStatus.OK);
	}



	@Transactional
	@DeleteMapping(value = "/book/{id}")
	public ResponseEntity removeBook(@PathVariable("id") int id) {


		booksDAO.removeBook(id);


		return new ResponseEntity(id, HttpStatus.OK);
	}

	@Transactional
	@GetMapping(value = "/book/{id}")
	public ResponseEntity getBook(@PathVariable("id") int id) {

		Books book = booksDAO.getBookById(id);


		logger.info("InfoRest ", book.getId(), book.getName(), book.getStatus());

		if (book == null) {
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity(book, HttpStatus.OK);
	}



	@Transactional
	@PutMapping(value = "/book")
	public ResponseEntity updateBook(@RequestBody Books book) {

		String result = booksDAO.updateBook(book);

		if (result == "1") {
			return new ResponseEntity("No Customer found for ID " + book.getId(), HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity(result, HttpStatus.OK);
	}








}