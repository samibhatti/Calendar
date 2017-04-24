using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace Kalender.Models
{
    public class CalendarModel

    {
        public CalendarModel()
        {

        }

        public int? Id { get; set; }

        public string SchemaType { get; set; }

        public string SchemaData { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh:mm}")]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string TrainingPass { get; set; }

        
    }
}