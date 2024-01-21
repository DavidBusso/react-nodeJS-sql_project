app.get('/sql/user/:id/albums/:albumId/album', async (req, res) => {
    res.json(await getCurrentAlbum(req.params.albumId))
})
app.post('/sql/user/:id/photos', async (req, res) => {
    const { albumId, title, url } =await req.body;
    res.json(await createPhotos(req.params.id, albumId, title, url, "photos"))
})
app.delete('/sql/user/:id/photos', async (req, res) => {
    res.json(await  deletePhoto(req.body.id, req.params.id))
})
app.put('/sql/user/:id/photos/editTitle', async (req, res) => {
    const { id, title } = req.body;
    res.json(await updateTitle(req.params.id, id, title, "photos"))
})
