let search = new ImdbAPI();

document.getElementById("SearchBtn").addEventListener("click", SearchForTitle)

function SearchForTitle()
{
    console.log("Searching...")
    let _searchTerm = document.getElementById("SearchInput").value;

    search.searchByTitle(_searchTerm);
}