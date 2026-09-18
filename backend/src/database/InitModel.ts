import User from "../modules/users/user.model";
import ArtistProfile from "../modules/artists/artist.model";
import Artwork from "../modules/artworks/artwork.model";
import Favorite from "../modules/favourites/favourite.model";
import Inquiry from "../modules/inquiries/inquiries.model";


export const initModels = (): void => {
  User.hasOne(ArtistProfile, {
    foreignKey: "userId",
    as: "artistProfile",
    onDelete: "CASCADE",
  });

  ArtistProfile.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  ArtistProfile.hasMany(Artwork, {
    foreignKey: "artistId",
    as: "artworks",
    onDelete: "CASCADE",
  });

  Artwork.belongsTo(ArtistProfile, {
    foreignKey: "artistId",
    as: "artist",
  });
};
User.hasMany(Favorite, {
  foreignKey: "userId",
  as: "favorites",
  onDelete: "CASCADE",
});

Favorite.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Artwork.hasMany(Favorite, {
  foreignKey: "artworkId",
  as: "favorites",
  onDelete: "CASCADE",
});

Favorite.belongsTo(Artwork, {
  foreignKey: "artworkId",
  as: "artwork",
});
User.hasMany(Inquiry, {
  foreignKey: "userId",
  as: "inquiries",
  onDelete: "CASCADE",
});

Inquiry.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Artwork.hasMany(Inquiry, {
  foreignKey: "artworkId",
  as: "inquiries",
  onDelete: "CASCADE",
});

Inquiry.belongsTo(Artwork, {
  foreignKey: "artworkId",
  as: "artwork",
});