using byh_api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace byh_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OilsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OilsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(OilCleaners oilCleaners)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.OilCleaners VALUES(@ProductName, @ProductType, @SkinType, @SkinIssue, @DayTime,
                                @Frequency, @MinAge, @ImageURL, @ForPregnant, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", oilCleaners.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductType", oilCleaners.ProductType);
                        myCommand.Parameters.AddWithValue("@SkinType", oilCleaners.SkinType);
                        myCommand.Parameters.AddWithValue("@SkinIssue", oilCleaners.SkinIssue);
                        myCommand.Parameters.AddWithValue("@DayTime", oilCleaners.DayTime);
                        myCommand.Parameters.AddWithValue("@Frequency", oilCleaners.Frequency);
                        myCommand.Parameters.AddWithValue("@minAge", oilCleaners.MinAge);
                        myCommand.Parameters.AddWithValue("@ImageURL", oilCleaners.ImageURL);
                        myCommand.Parameters.AddWithValue("@ForPregnant", oilCleaners.ForPregnant);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Inserted Successfully";
                    HttpContext.Response.StatusCode = response.StatusCode;
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Inserting Data Failed";
                HttpContext.Response.StatusCode = response.StatusCode;
            }

            return new JsonResult(response);
        }
    }
}
