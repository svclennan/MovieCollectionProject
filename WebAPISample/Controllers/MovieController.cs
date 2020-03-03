using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            // Retrieve all movies from db logic
            var movies = _context.Movies.ToList();
            return movies;
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public Movie Get(int id)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieId == id);
            return movie;
        }

        // POST api/movie
        [HttpPost]
        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
            Movie movie = new Movie()
            {
                Title = value.Title,
                Genre = value.Genre,
                Director = value.Director
            };
            _context.Add(movie);
            _context.SaveChanges();
        }

        // PUT api/movie/5
        [HttpPut]
        public void Put([FromBody]Movie value)
        {
            var movie = _context.Movies.Where(a => a.MovieId == value.MovieId).FirstOrDefault();
            movie.Title = value.Title;
            movie.Genre = value.Genre;
            movie.Director = value.Director;
            _context.SaveChanges();
            // Update movie in db logic
        }

        // DELETE api/movie/5
        [HttpDelete]
        public void Delete(int id)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieId == id);
            _context.Movies.Remove(movie);
            _context.SaveChanges();
        }
    }
}