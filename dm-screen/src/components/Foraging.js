
export default function Foraging() {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Food and Water Availability</th>
                    <th>DC</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Abundant food and water supply</td>
                    <td>10</td>

                </tr>
                <tr>
                    <td>Limited food and water supply</td>
                    <td>15</td>

                </tr>
                <tr>
                    <td>Very little, if any, food and water supply</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
            On a success, a character forages 1d6 pounds of food and 1d6 gallons of water.
        </div>
    );
}