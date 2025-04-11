using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BulkyBooksAPI.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace BulkyBooksAPI.DataAccess.Repository.IRepository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> SignUpAsync(SignUpModel signUpModel);

        Task<string> LoginAsync(SignInModel signInModel);
    }
}
