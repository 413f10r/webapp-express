import connection from "../data/db.js";


function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        // if (err)
        //     return res.status(500).json({
        //         error: 'Query error: INDEX'
        //     })

        // (err) ? res.status(500).json({ error: 'ERRORE DB' }) : null;

        (err) && res.status(500).json({ error: 'ERRORE DB' });

        // res.json(results)
        const movie = results.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movie)
    })

}



function show(req, res) {
    const { id } = req.params;
    const movieSql = 'SELECT * FROM movies WHERE id=?'
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id=?'

    connection.query(movieSql, [id], (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Query error: SHOW movies'
            })

        if (results.length === 0)
            return res.status(404).json({
                error: 'Movie Not Found'
            })
        const movie = results[0];

        connection.query(reviewSql, [id], (err, reviewsResults) => {
            if (err)
                return res.status(500).json({
                    error: 'Query error: SHOW review'
                })
            movie.reviews = reviewsResults;
            // res.json(movie)

            res.json({
                ...movie,
                image: req.imagePath + movie.image
            })

            res.json(movie)
        })


    })


}

function destroy(req, res) {
    const { id } = req.params;

    const sql = 'DELETE FROM movies WHERE id = ?';

    connection.query(sql, [id], (err) => {
        if (err)
            return res.status(500).json({
                error: 'Query error: DESTROY',
            });

        res.sendStatus(204);
    });
}

function update(req, res) {
    const { id } = req.params
    const { image } = req.body

    const sql = `UPDATE movies SET image = ? WHERE id = ?`

    connection.query(sql, [image, id], (err) => {
        err && res.status(500).json({ error: "Server error Update" })
        res.json({ message: "Movie update successfully" })
    })

}

export {
    index, show, destroy, update
}