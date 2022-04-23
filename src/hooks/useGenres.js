const useGenres = (selectedGenre) => {

    if (selectedGenre.length < 1) return "";
    const gid = selectedGenre.map((g) => g.id);
    return gid.reduce((acc, curr) => acc + ',' + curr);
}

export default useGenres;