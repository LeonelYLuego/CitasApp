using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Data;

public class LikesRepository : ILikesRepository
{
    public Task<UserLike> GetUserLikeAsync(int sourceUserId, int targetUserId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<LikeDto>> GetUserLikesAsync(string predicate, int userId)
    {
        throw new NotImplementedException();
    }

    public Task<AppUser> GetUserWithLikesAsync(int userId)
    {
        throw new NotImplementedException();
    }
}