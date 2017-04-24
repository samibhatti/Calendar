using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;


namespace Events.Models
{
    public class Event
    {
        public Event(int i, string n, DateTime s, DateTime e)
        {
            this.Id = i;
            this.title = n;
            this.start = s;
            this.end = e;
            
        }

        public Event()
        {
        }

        public int Id { get; set; }
        
        public string title { get; set; }

        public DateTime start { get; set; }

        public DateTime end { get; set; }
    }
}