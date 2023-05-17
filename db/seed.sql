
\c events_dev;


INSERT INTO song_genres (genre_type) VALUES
('R & B'),
('Hip Hop'),
('Kids Bop'),
('Old School'),
('Dancehall'),
('Jazz');


INSERT INTO songs (genre_id, title, song_url, artist, length) VALUES
(1, 'Come & Talk To Me', 'https://soundcloud.com/bonafidernb/come-talk-to-me?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Jodeci', '4:30' ),
(2, 'Loyalty', 'https://soundcloud.com/kendrick-lamar-music/loyalty?in=soundcloud-hustle/sets/love-rap-hip-hop-love-songs&si=11f88ee197ee4c809b9c6c4e50a1d030&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Kenrick Lamar feat Rihanna', '3:47'),
(3, 'About That Time', 'https://soundcloud.com/kidzbopkids/about-that-time?in=kidzbopkids/sets/kidz-bop-2023&si=11f88ee197ee4c809b9c6c4e50a1d030&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Kids Bop Kids', '3:12'),
(4, 'Candy Rain', 'https://soundcloud.com/soul-for-real-official/candy-rain?in=user-358245022/sets/cook-out-classics-the-ultimate&si=11f88ee197ee4c809b9c6c4e50a1d030&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Soul For Real', '4:36'),
(5, 'Redemption', 'https://soundcloud.com/dancehallpromoofficial/redemption-song?si=11f88ee197ee4c809b9c6c4e50a1d030&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Tommy Lee Sparta', '4:14'),
(6, 'Instrumental Music', 'https://soundcloud.com/andikasofyan7/instrumental-music-blues?si=570f6505a435456e8b01910b9615178a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', 'Andika Sofyan', '6:29');


INSERT INTO playlist (name, song_id, song_genre_id) VALUES
('Kids Party', 3, 3),
('Soul Food Sunday', 4, 4),
('Paint & Sip', 6, 6),
('Dancehall', 5, 5),
('Family Reunion', 1, 1),
('Sports Night', 2, 2);


INSERT INTO categories (name) VALUES
('Family'),
('Inspirational'),
('Kids'),
('Sports'),
('Music');

INSERT INTO quotes (category_id, quotee, quote) VALUES
(1, 'Jon Krakauer, Into the Wild', 'Happiness [is] only real when shared!'),
(2, 'Oscar Wilde', 'Be yoursef; everyone is already taken.'),
(3, 'Paula Poundstone', 'Adults are always asking little kids what they want to be when they grow up ’cause they’re looking for ideas.'),
(4, 'Babe Ruth', 'Every strike brings me closer to the next home run.'),
(5, 'Bob Marley', 'One good thing about music, when it hits you, you feel no pain.');

INSERT INTO quote_list (quote_id, category_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO recipe_details (name, description, image, instructions, servings, calories) VALUES
('Lasagna', 'Baked ziti is always a hit! It is a favorite amongst my friends and family!', 'https://pinchofyum.com/wp-content/uploads/Three-Cheese-Baked-Ziti.jpg', 
'Bring a large pot of lightly salted water to a boil. Add ziti pasta, and cook until al dente, about 8 minutes; drain.

Meanwhile, brown ground beef and onion in a large skillet over medium heat; stir in spaghetti sauce and simmer for 15 minutes.

Preheat the oven to 350 degrees F (175 degrees C). Butter a 9x13-inch baking dish.

Spread 1/2 of the ziti in the bottom of the prepared dish; top with Provolone cheese, sour cream, 1/2 of the meat sauce, remaining ziti, mozzarella cheese, and remaining meat sauce. Top with grated Parmesan cheese.

Bake in the preheated oven until heated through and cheeses have melted, about 30 minutes.
', 10, 578);

INSERT INTO measure (name) VALUES
('cup'),
('teaspoon'),
('tablespoon'),
('gram'),
('pound'),
('ounce');

INSERT INTO ingredient (name) VALUES
('Ziti pasta'),
('Onion, chopped'),
('Green pepper, chopped'),
('lean ground beef'),
('Kelbasa Sausage'),
('Sweet Italian Ground Sausage'),
('Spaghetti Sauce'),
('Provolone cheese'),
('Mozarella cheese, shredded'),
('Parmesean Cheese, shredded');

INSERT INTO recipes (recipe_details_id, ingredient_id, measure_id, amount) VALUES
(1, 1, 5, 2),
(1, 2, null, 1),
(1, 3, null, 1),
(1, 4, 5, 1),
(1, 5, 5, 1),
(1, 6, 5, 1),
(1, 7, 6, 32),
(1, 8, 6, 8),
(1, 9, 6, 16),
(1, 10, 3, 4);

INSERT INTO event_menu (recipe_id) VALUES
(1);

INSERT INTO events (name, playlist_id, event_menu_id, quote_list_id, event_type) VALUES
('Family Time', 5, 1, 1, 'Family');
