using System;
using System.Reflection;

namespace WebApplication1.Models
{
    public class Comment
    {
        public Guid Id { get; set; }

        public string User { get; set; }

        public string Content { get; set; }

        public int? Rate { get; set; }

        public DateTime Date { get; set; }

        public Guid ArticleID { get; set; }

        public void Clone(Comment model)
        {
            PropertyInfo[] properties = model.GetType().GetProperties();

            for (int i = 0; i < properties.Length; i++)
            {
                properties[i].SetValue(this, properties[i].GetValue(model));
            }
        }
    }
}
