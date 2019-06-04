using System;
using System.Reflection;

namespace WebApplication1.Models
{
    public class Article
    {
        public Guid ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Views { get; set; }

        public DateTime Date { get; set; }

        public Difficulties Difficulty { get; set; }

        public Languages Language { get; set; }

        public void Clone(Article model)
        {
            PropertyInfo[] properties = model.GetType().GetProperties();

            for (int i = 0; i < properties.Length; i++)
            {
                properties[i].SetValue(this, properties[i].GetValue(model));
            }
        }
    }
}
