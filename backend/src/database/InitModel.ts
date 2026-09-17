import User from "../modules/users/user.model";
import ArtistProfile from "../modules/artists/artist.model";
import Artwork from "../modules/artworks/artwork.model";

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