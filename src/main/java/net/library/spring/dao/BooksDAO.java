package net.library.spring.dao;

import net.library.spring.model.Books;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Repository
public class BooksDAO {



	@Autowired
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sf){
		this.sessionFactory = sf;
	}
	private static final org.slf4j.Logger logger = LoggerFactory.getLogger(BooksDAO.class);


	@SuppressWarnings("unchecked")
	public List<Books> listBooks() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Books> BooksList = session.createQuery("from Books").list();

		return BooksList;
	}




	public void addBook(Books book) {
		Session session = this.sessionFactory.getCurrentSession();


		logger.info("InfoFromRest:       " + book.getName() + book.getStatus());


		session.persist(book);

	}


	public void removeBook(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Books book = (Books) session.load(Books.class, new Integer(id));
		if(null != book){
			session.delete(book);
		}

	}



	public String updateBook(Books bookNew) {
		Session session = this.sessionFactory.getCurrentSession();
		Books book = (Books) session.load(Books.class, new Integer(bookNew.getId()));
		if(book != null){
			session.update(bookNew);

			return "ok";
		} else {

			return "1";

		}



	}




	public Books getBookById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Books book = (Books) session.load(Books.class, new Integer(id));

		return book;
	}



}