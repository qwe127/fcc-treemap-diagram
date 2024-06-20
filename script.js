const url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'

const mainFunction = async () =>{
    const response = await fetch(url)
    const data = await response.json()
    const colorsArray = ["#d476bf","#c96d54","#ddd888","#5bcb4c","#62cdb4", "#578075", "#414f79", "#746484", "#7dfb30", "#a159aa", "#f78075","#414f79","#746484", "#7d3b60", "#7d5949", "#7e2238", "#746b27", "#4b7f44"]
    const consolesArray1 = ['2600', 'Wii', 'NES', 'GB', 'DS', 'X360', 'PS3', 'PS2', 'SNES']
    const consolesArray2 = ['GBA', 'PS4', '3DS', 'N64', 'PS', 'XB', 'PC', 'PSP', 'XOne']

    const root = d3.hierarchy(data, (d) => {return d.children})
                        .sum((d) => {return d.value})
                        .sort((a, b) => {return b.value - a.value})
                      
    const width = 1000
    const height = 650
    const padding = 70

    d3.select('body').append('h1').text('FCC Treemap Diagram').attr('id', 'title')
    d3.select('body').append('p').text(data.name).attr('id', 'description')
    d3.select('body').append('svg').attr('width', width).attr('height', height).attr('id', 'svgCanvas').style('background-color', 'rgb(30, 29, 36)')
    d3.select('body').append('svg').attr('width', width / 4).attr('height', height / 4).attr('id', 'legend').style('background-color', 'rgb(30, 29, 36)')
    
    const svgCanvas = d3.select("#svgCanvas")
    const legendCanvas = d3.select("#legend")
    const treemapLayout = d3.treemap().size([width, height]).paddingInner(4).paddingOuter(1)
    treemapLayout(root)
    
    const vGTiles = root.leaves()
    
    const nodes = svgCanvas
    .selectAll('g')
    .data(vGTiles)
    .enter()
    .append('g')
    .attr('transform', (d)=> {return `translate('${[d.x0, d.y0]}')`})
    
    console.log(vGTiles)
    
    nodes.append('rect')
    .attr('class', 'tile')
    
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('x', (d) => d.x0)
    .attr('y', (d) => d.y0)

    .attr('fill', (d)=>{
        const vGConsole = d.data.category

        if (vGConsole === '2600'){return colorsArray[0]}
        if (vGConsole === 'Wii'){return colorsArray[1]}
        if (vGConsole === 'NES'){return colorsArray[2]}
        if (vGConsole === 'GB'){return colorsArray[3]}
        if (vGConsole === 'DS'){return colorsArray[4]}
        if (vGConsole === 'X360'){return colorsArray[5]}
        if (vGConsole === 'PS3'){return colorsArray[6]}
        if (vGConsole === 'PS2'){return colorsArray[7]}
        if (vGConsole === 'SNES'){return colorsArray[8]}
        if (vGConsole === 'GBA'){return colorsArray[9]}
        if (vGConsole === 'PS4'){return colorsArray[10]}
        if (vGConsole === '3DS'){return colorsArray[11]}
        if (vGConsole === 'N64'){return colorsArray[12]}
        if (vGConsole === 'PS'){return colorsArray[13]}
        if (vGConsole === 'XB'){return colorsArray[14]}
        if (vGConsole === 'PC'){return colorsArray[15]}
        if (vGConsole === 'PSP'){return colorsArray[16]}
        if (vGConsole === 'XOne'){return colorsArray[17]}
        
    })
    
    nodes.append('text')
    .text((d)=> d.data.name)
    .attr('dx', (d)=>d.x0 + 2)
    .attr('dy', (d)=>d.y1 - 10)
    .attr('id', 'titles')

    legendCanvas.append('g').attr('id', 'legend-group-1')
    const legendGroup1 = d3.select('#legend-group-1')

    legendGroup1.data(vGTiles).selectAll('text').data(consolesArray1).enter().append('text').text((d) => {return `${d} `}).attr('y', (d,i) => 18 * i).attr('x', 20)
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', -8).attr('fill', colorsArray[0]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 10).attr('fill', colorsArray[1]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 28).attr('fill', colorsArray[2]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 46).attr('fill', colorsArray[3]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 64).attr('fill', colorsArray[4]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 82).attr('fill', colorsArray[5]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 100).attr('fill', colorsArray[6]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 117).attr('fill', colorsArray[7]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 8).attr('y', 134).attr('fill', colorsArray[8]).attr('class', 'legend-item')
    
    legendCanvas.append('g').attr('id', 'legend-group-2')
    const legendGroup2 = d3.select('#legend-group-2')
    legendGroup2.data(vGTiles).selectAll('text').data(consolesArray2).enter().append('text').text((d) => {return `${d} `}).attr('y', (d,i) => 18 * i).attr('x', 20)
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', -8).attr('fill', colorsArray[9]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 10).attr('fill', colorsArray[10]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 28).attr('fill', colorsArray[11]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 46).attr('fill', colorsArray[12]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 64).attr('fill', colorsArray[13]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 82).attr('fill', colorsArray[14]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 100).attr('fill', colorsArray[15]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 117).attr('fill', colorsArray[16]).attr('class', 'legend-item')
    legendGroup1.data(vGTiles).append('rect').attr('height', 10).attr('width', 10).attr('x', 97).attr('y', 134).attr('fill', colorsArray[17]).attr('class', 'legend-item')
    
    const tooltip = d3.select('#tooltip')
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("border-width", "1px")

    d3.selectAll('.tile').data(vGTiles)
    .on("mouseover", (event, d) => {

        tooltip.attr('data-value', (_)=> d.data.value )
        tooltip.style("visibility", "visible")
        tooltip.style("opacity", "1")
        tooltip.html(`<p>Platform: ${d.data.category}<br>Title: ${d.data.name}<br>Value: ${d.data.value}</p>`)        
        .style('outline', '1.5px solid rgba(0, 0, 0, 0.616)')
    })
    .on("mousemove", (event, d) => {
        const x = event.x
        const y = event.y
            return tooltip.style('top', y + 10 + 'px').style('left', x + 10 +'px')})
    .on("mouseout", () => {return tooltip.style("opacity", "0").style('visibility', 'hidden')});
}


document.addEventListener('DOMContentLoaded', mainFunction)