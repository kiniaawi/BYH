﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace byh_api.Models
{
    public class Dal
    {
        //data access layer
        public Response Registration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            string hashedPassword = GetMd5Hash(registration.Password);  
            SqlCommand cmd = new SqlCommand("INSERT INTO dbo.Registration(Name, Email, Password, IsActive, IsDeleted, CreatedAt, DeletedAt, IsAdmin) VALUES('"+registration.Name+ "', '"+registration.Email+ "', '"+ hashedPassword + "', 1, 0, GETDATE(), null, 0);", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0) 
            {
                response.StatusCode = 200;
                response.StatusMessage = "Registration successful";
            } 
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Registration failed";
            }


            return response;
        }

        static string GetMd5Hash(string input)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                StringBuilder sBuilder = new StringBuilder();

                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }

                return sBuilder.ToString();
            }
        }

        public Response Login(Registration registration, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE Email = '" + registration.Email + "';", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();

            if (dt.Rows.Count > 0)
            {
                string hashedPasswordFromDatabase = Convert.ToString(dt.Rows[0]["Password"]);
                string hashedUserPassword = GetMd5Hash(registration.Password);

                if (hashedUserPassword == hashedPasswordFromDatabase)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Login successful";
                    Registration reg = new Registration();
                    reg.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                    reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                    reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                    reg.IsAdmin = Convert.ToInt32(dt.Rows[0]["IsAdmin"]);
                    response.Registration = reg;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Login failed";
                    response.Registration = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login failed";
                response.Registration = null;
            }

            return response;
        }

        /*public Response Login(Registration registration, SqlConnection connection)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE Email = '" + registration.Email + "';", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();

            if (dt.Rows.Count > 0)
            {
                string hashedPasswordFromDatabase = Convert.ToString(dt.Rows[0]["Password"]);
                string userEnteredPassword = registration.Password;

                // Porównanie haszy
                if (BCrypt.Net.BCrypt.Verify(userEnteredPassword, hashedPasswordFromDatabase))
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Login successful";
                    Registration reg = new Registration();
                    reg.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                    reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                    reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                    reg.IsAdmin = Convert.ToInt32(dt.Rows[0]["IsAdmin"]);
                    response.Registration = reg;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Login failed";
                    response.Registration = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login failed";
                response.Registration = null;
            }

            return response;
        }*/

        /*public Response Login(Registration registration, SqlConnection connection) 
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE Email = '"+registration.Email+"' AND Password = '"+registration.Password+"';", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            Response response = new Response();

            if (dt.Rows.Count > 0) 
            {
                response.StatusCode = 200;
                response.StatusMessage = "Login successful";
                Registration reg = new Registration();
                reg.Id = Convert.ToInt32(dt.Rows[0]["Id"]);
                reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                reg.IsAdmin = Convert.ToInt32(dt.Rows[0]["IsAdmin"]);
                response.Registration = reg;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login failed";
                response.Registration = null;
            }

            return response;
        }*/

        public Response GetUsers(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Registration WHERE IsActive = 1;", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Registration> usersList = new List<Registration>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Registration reg = new Registration();
                    reg.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    reg.IsDeleted = Convert.ToInt32(dt.Rows[i]["IsDeleted"]);
                    reg.CreatedAt = Convert.ToString(dt.Rows[i]["CreatedAt"]);
                    reg.DeletedAt = Convert.ToString(dt.Rows[i]["DeletedAt"]);
                    reg.IsAdmin = Convert.ToInt32(dt.Rows[i]["IsAdmin"]);
                    usersList.Add(reg);
                }

                if (usersList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Fetching users successful";
                    response.listUsers = usersList;
                } 
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Fetching users failed";
                    response.listUsers = null;
                } 
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Fetching users failed";
                response.listUsers = null;
            }

            return response;
        }

        public Response DeleteUser(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("DELETE FROM dbo.Registration WHERE Id = '"+registration.Id+"';", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User deleted successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Failed to delete user";
            }


            return response;
        }

        public Response AddSkinIssues(SkinIssues skinIssues, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO SkinIssues(IssueName, Placement, ImageURL, IsDeleted) VALUES('" + skinIssues.IssueName + "', '" + skinIssues.Placement + "', '" + skinIssues.ImageURL + "', 0);", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if(i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Skin Issue added";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Skin Issue adding failed";
            }

            return response;
        }

        public Response SkinIssuesList(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM SkinIssues WHERE IsDeleted = 0;", connection);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List <SkinIssues> skinIssuesList = new List <SkinIssues>();
            if(dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    SkinIssues skinIssues = new SkinIssues();
                    skinIssues.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    skinIssues.IssueName = Convert.ToString(dt.Rows[i]["IssueName"]);
                    skinIssues.Placement = Convert.ToString(dt.Rows[i]["Placement"]);
                    skinIssues.ImageURL = Convert.ToString(dt.Rows[i]["ImageURL"]);
                    skinIssues.IsDeleted = Convert.ToInt32(dt.Rows[i]["IsDeleted"]);
                    skinIssuesList.Add(skinIssues);

                }

                if(skinIssuesList.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Skin Issues data found";
                    response.listSkinIssues = skinIssuesList;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Skin Issues data not found";
                    response.listSkinIssues = null;
                }
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Skin Issues data not found";
                response.listSkinIssues = null;
            }

            return response;
        }

        public Response StaffRegistration(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("INSERT INTO Staff(Name, Email, Password, IsActive, CreatedAt) VALUES('" + staff.Name + "', '" + staff.Email + "', '" + staff.Password + "', 1, GETDATE());", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff registration successful";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff registration failed";
            }


            return response;
        }

        
    }
}
