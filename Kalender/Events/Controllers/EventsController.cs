using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Events.Models;
using System.Web.Http.Cors;

namespace kalender.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EventsController : ApiController
    {
        // GET: api/Events
        public IEnumerable<Event> Get()
        {
            Event [] events= new Event[5];
            
            events[0] = new Event(1, " Meeting", DateTime.Today.AddDays(1).AddHours(10).AddMinutes(30), DateTime.Today.AddDays(1).AddHours(12));
            events[1] = new Event(2, " Lunch", DateTime.Today.AddDays(1).AddHours(12).AddMinutes(20), DateTime.Today.AddDays(1).AddHours(13));
            events[2] = new Event(3, " Meeting", DateTime.Today.AddDays(3).AddHours(10).AddMinutes(30), DateTime.Today.AddDays(3).AddHours(12));
            events[3] = new Event(4, " Training", DateTime.Today.AddDays(3).AddHours(12).AddMinutes(20), DateTime.Today.AddDays(3).AddHours(13));
            events[4] = new Event(5, " Fika", DateTime.Today.AddDays(4).AddHours(15).AddMinutes(30), DateTime.Today.AddDays(4).AddHours(16));

            return events;
        }

        // GET: api/Events/5
        public int Get(int id)
        { 
        
            return 4;
        }

        // POST: api/Events
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Events/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Events/5
        public void Delete(int id)
        {
        }
    }
}
