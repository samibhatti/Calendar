using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kalender.Models
{
    public class CalendarController : Controller
    {
        // GET: Calendar
        public ActionResult Index()

        {
            List<CalendarModel> model = new List<CalendarModel>();

            var data = new[]
            {
                new CalendarModel
                {
                   Id = 1,
                   StartDate = DateTime.Parse("2017-04-10 09:30"),
                   EndDate = DateTime.Parse("2017-04-10 10:30"),
                   SchemaData = "Meeting",
                   SchemaType = "Arbete",
                   TrainingPass = "Spinning"
                },

                new CalendarModel
                {
                   Id = 2,
                   StartDate = DateTime.Parse("2017-04-12 11:30"),
                   EndDate = DateTime.Parse("2017-04-12 12:30"),
                   SchemaData = "Meeting",
                   SchemaType = "Arbete",
                   TrainingPass = "Spinning"
                },

                new CalendarModel
                {
                   Id = 3,
                   StartDate = DateTime.Parse("2017-04-13 11:30"),
                   EndDate = DateTime.Parse("2017-04-13 12:30"),
                   SchemaData = "Meeting",
                   SchemaType = "Arbete",
                   TrainingPass = "Spinning"
                },

                new CalendarModel
                {
                   Id = 4,
                   StartDate = DateTime.Parse("2017-04-17 11:30"),
                   EndDate = DateTime.Parse("2017-04-17 12:30"),
                   SchemaData = "Meeting",
                   SchemaType = "Arbete",
                   TrainingPass = "Spinning"
                },

                new CalendarModel
                {
                   Id = 5,
                   StartDate = DateTime.Parse("2017-04-21 10:30"),
                   EndDate = DateTime.Parse("2017-04-21 11:30"),
                   SchemaData = "Meeting",
                   SchemaType = "Arbete",
                   TrainingPass = "Spinning"
                }
            };

            var date = data.FirstOrDefault().StartDate;
            var lastdate = data.LastOrDefault().StartDate;
            var diff = (lastdate - date).Days;
            
            foreach (var item in data)
	        {
                if (item.StartDate == date)
                {
                    model.Add(item);
                }
                else
                {
                    date = date.AddDays(1);
                    if (date.DayOfWeek == DayOfWeek.Saturday)
                    {
                        date = date.AddDays(2);
                    }
                    model.Add(new CalendarModel { StartDate = date });
                }
	        }

             return View(model);
         }

        // GET: Calendar/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Calendar/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Calendar/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Calendar/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Calendar/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Calendar/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Calendar/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
