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

    public class SkinIssuesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public SkinIssuesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            Response response = new Response();

            try
            {
                string query = @"SELECT Id, IssueName, Placement, ImageURL, IsDeleted from dbo.SkinIssues";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Fetched Successfully";
                    response.Data = table;
                }              
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Fetching Data Failed";
            }

            return new JsonResult(response);
        }

        [HttpPost]
        public JsonResult Post(SkinIssues skinIssues)
        {
            Response response = new Response();

            try
            {
                string query = @"INSERT INTO dbo.SkinIssues VALUES(@IssueName, @Placement, @ImageURL, 0)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@IssueName", skinIssues.IssueName);
                        myCommand.Parameters.AddWithValue("@Placement", skinIssues.Placement);
                        myCommand.Parameters.AddWithValue("@ImageURL", skinIssues.ImageURL);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Inserted Successfully";
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Inserting Data Failed";
            }


            return new JsonResult(response);
        }

        [HttpPut]
        public JsonResult Put(SkinIssues skinIssues)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.SkinIssues SET IssueName = @IssueName, Placement = @Placement, ImageURL = @ImageURL, IsDeleted = @IsDeleted 
                            WHERE Id = @Id";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", skinIssues.Id);
                        myCommand.Parameters.AddWithValue("@IssueName", skinIssues.IssueName);
                        myCommand.Parameters.AddWithValue("@Placement", skinIssues.Placement);
                        myCommand.Parameters.AddWithValue("@ImageURL", skinIssues.ImageURL);
                        myCommand.Parameters.AddWithValue("@IsDeleted", skinIssues.IsDeleted);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Data Updated Successfully";
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Updating Data Failed";
            }


            return new JsonResult(response);
        }

       // [Route("DelIssue")]
        [HttpPut("DelIssue/{Id}")]
        public JsonResult DelIssue(int Id)
        {
            Response response = new Response();

            try
            {
                string query = @"UPDATE dbo.SkinIssues SET IsDeleted = 1
                            WHERE Id = @Id AND IsDeleted = 0";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("BYHCon");
                SqlDataReader myReader;
                using (SqlConnection myConn = new SqlConnection(sqlDataSource))
                {
                    myConn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConn))
                    {
                        myCommand.Parameters.AddWithValue("@Id", Id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myConn.Close();
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Issue Deleted Successfully";
                    response.Data = table;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Issue";
            }


            return new JsonResult(response);
        }

        [HttpDelete("{Id}")]
        public JsonResult Delete(int Id)
        {
            string query = @"DELETE FROM dbo.SkinIssues 
                            WHERE Id = @Id AND IsDeleted = 0";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BYHCon");
            SqlDataReader myReader;
            using (SqlConnection myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@Id", Id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myConn.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            Response response = new Response();

            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                if (postedFile != null && postedFile.Length > 0)
                {
                    string filename = Path.GetFileName(postedFile.FileName);
                    var physicalPath = Path.Combine(_env.ContentRootPath, "Photos", filename);

                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                    }

                    response.StatusCode = 200;
                    response.StatusMessage = "Photo Saved Successfully";
                    return new JsonResult(filename);
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "No file provided.";
                    return new JsonResult(response);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Save Photo";
                return new JsonResult(response);
            }
        }

        /*[Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile() 
        {
            Response response = new Response();

            try
            {
                try
                {
                    var httpRequest = Request.Form;
                    var postedFile = httpRequest.Files[0];
                    string filename = postedFile.FileName;
                    var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                    }

                    return new JsonResult(filename);

                }
                catch (Exception)
                {
                    return new JsonResult("nophoto.png");
                }

                response.StatusCode = 200;
                response.StatusMessage = "Photo Saved Successfully";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                response.StatusCode = 100;
                response.StatusMessage = "Failed to Delete Issue";
            }

            return new JsonResult(response);

        }*/
    }
}
