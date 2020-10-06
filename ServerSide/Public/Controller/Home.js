document.getElementById("SearchBtn").addEventListener("click", SearchForTitle)

function SearchForTitle()
{
    console.log("Searching...")
    let _searchTerm = document.getElementById("SearchInput").value;
    console.log("You Searched for : " + _searchTerm);
    //I need navigate to a url to ask server to return a JSON
    //search.searchByTitle(_searchTerm);
}