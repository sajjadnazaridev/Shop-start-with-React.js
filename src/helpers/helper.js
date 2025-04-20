const shortenText = text => {
    return text.split(" ").slice(0, 3).join("");
}

const searchProducts = (products, search) => {
    if (!search) return products;

    const searchedProducts = products.filter(p => p.title.toLowerCase().includes(search));

    return searchedProducts;
}

const filterProducts = (products, category) => {
    if (!category) return products;

    const filteredProducts = products.filter(p => p.category === category);
    return filteredProducts;
}

const createObjectQuery = (currentQuery, newQuery) => {
    // console.log(`Current query: ${JSON.stringify(currentQuery)}`);
    // console.log(`New query: ${JSON.stringify(newQuery)}`);

    if (newQuery.category === "all") {
        const { category, ...rest } = currentQuery;
        return rest;
    }

    if (newQuery.search === "") {
        const { search, ...rest } = currentQuery;
        return rest;
    }

    return { ...currentQuery, ...newQuery };
}

const getInitialQuery = (searchParams) => {
    const query = {};
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category && category !== "all") {
        query.category = category;
    }
    if (search) {
        query.search = search;
    }
    return query;
}

export { shortenText, searchProducts, filterProducts, createObjectQuery, getInitialQuery };