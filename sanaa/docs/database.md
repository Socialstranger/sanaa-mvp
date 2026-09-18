# Sanaa Database

Database:
PostgreSQL

ORM:
Sequelize

Database name:
sanaa_db

## Planned entities

User
Artist
Artwork
ArtworkImage
Category
Favorite
Inquiry
ArtistApplication

## User

Table:
users

Fields:

id UUID PRIMARY KEY
name VARCHAR NOT NULL
email VARCHAR UNIQUE NOT NULL
password_hash VARCHAR NOT NULL
role VARCHAR NOT NULL DEFAULT USER
avatar_url VARCHAR NULL
created_at TIMESTAMP
updated_at TIMESTAMP

Roles:

USER
ARTIST
ADMIN