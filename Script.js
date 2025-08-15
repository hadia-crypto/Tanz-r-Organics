document.addEventListener('DOMContentLoaded', () => {
    const csvData = `Name,Type,SKU,Price,Categories,Stock Status,Tags,Short Description,Long Description
Hair Oil 500ml,variable,HO500,4900,Hair Care,instock,"organic, herbal, eco-friendly",Nourishing hair oil for healthy growth.,"Enriched with natural herbs and oils to strengthen and revitalize your hair. Key ingredients: Amla, Bhringraj, Coconut Oil."
Hair Oil 250ml,variable,HO250,2800,Hair Care,instock,"organic, herbal, eco-friendly",Nourishing hair oil for healthy growth.,"Enriched with natural herbs and oils to strengthen and revitalize your hair. Key ingredients: Amla, Bhringraj, Coconut Oil."
Hair Serum 30ml,variable,HS30,1999,Hair Care,instock,"organic, herbal, eco-friendly","Lightweight serum for smooth, frizz-free hair.","Packed with herbal extracts to tame frizz and add shine. Key ingredients: Aloe Vera, Green Tea, Argan Oil."
Hair Serum 50ml,variable,HS50,2500,Hair Care,instock,"organic, herbal, eco-friendly","Lightweight serum for smooth, frizz-free hair.","Packed with herbal extracts to tame frizz and add shine. Key ingredients: Aloe Vera, Green Tea, Argan Oil."
Face Mask Premium 2200g,simple,FM2200,2200,Face Care,instock,"organic, herbal, eco-friendly",Detoxifying and brightening face mask.,"Natural dry powder mask with ingredients like Fuller’s Earth, Neem, and Rose Powder."
Face Mask Regular 1200g,simple,FM1200,1200,Face Care,instock,"organic, herbal, eco-friendly",Gentle cleansing face mask.,Herbal dry mask formulated with Multani Mitti and Turmeric.
Face Mask Plus 1500g,simple,FM1500,1500,Face Care,instock,"organic, herbal, eco-friendly",Hydrating and soothing face mask.,"Contains Aloe Vera, Sandalwood, and Licorice extracts."
Soap 80g Premium,simple,SP1499,1499,Soaps,instock,"organic, herbal, eco-friendly",Moisturizing soap with natural oils.,"Handmade soap with Olive Oil, Shea Butter, and essential oils."
Soap 80g Standard,simple,SP999,999,Soaps,instock,"organic, herbal, eco-friendly",Gentle cleansing soap.,Natural soap with Coconut Oil and herbal extracts.
Shampoo – Launching Soon,simple,SHAMPOO001,0,Hair Care,outofstock,"organic, herbal, eco-friendly",Coming soon – herbal shampoo.,Stay tuned for our new organic herbal shampoo with natural ingredients.`;

    function parseCSV(csvString) {
        const lines = csvString.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const products = [];

        for (let i = 1; i < lines.length; i++) {
            let currentLine = lines[i];
            let inQuote = false;
            let parsedLine = [];
            let currentField = '';

            for (let j = 0; j < currentLine.length; j++) {
                const char = currentLine[j];
                if (char === '"' && (j === 0 || currentLine[j-1] === ',' || inQuote)) {
                    inQuote = !inQuote;
                    if (!inQuote && currentLine[j+1] === '"') { 
                        currentField += '"';
                        j++; 
                    }
                } else if (char === ',' && !inQuote) {
                    parsedLine.push(currentField.trim());
                    currentField = '';
                } else {
                    currentField += char;
                }
            }
            parsedLine.push(currentField.trim());

            const product = {};
            headers.forEach((header, index) => {
                product[header] = parsedLine[index];
            });
            products.push(product);
        }
        return products;
    }

    const productsData = parseCSV(csvData);
    const productCardsContainer = document.getElementById('product-cards-container');

    const featuredProducts = productsData.filter(p => p['Stock Status'] === 'instock').slice(0, 6);

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('bg-[#FDFCFE]', 'p-6', 'rounded-lg', 'shadow-md', 'border', 'border-[#EDE8F7]', 'hover:shadow-xl', 'transition-shadow', 'duration-300', 'transform', 'hover:-translate-y-1');

        const productNameForImage = product.Name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '+');
        const imageUrl = `https://placehold.co/300x200/EDE8F7/4B365F?text=${productNameForImage}`;

        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${product.Name}" class="w-full h-48 object-cover rounded-md mb-4">
            <h3 class="text-xl font-semibold text-[#4B365F] mb-2">${product.Name}</h3>
            <p class="text-[#B0B0B0] text-sm mb-4">${product['Short Description']}</p>
            <span class="text-xl font-bold text-[#D8C8EB]">PKR ${(parseInt(product.Price) / 100).toFixed(2)}</span>
            <button class="mt-4 w-full bg-[#D8C8EB] text-[#4B365F] font-bold py-2 px-4 rounded-full hover:bg-[#4B365F] hover:text-white transition-all duration-300">Add to Cart</button>
        `;
        productCardsContainer.appendChild(productCard);
    });
});
