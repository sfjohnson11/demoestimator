interface SampleEstimateProps {
  isCommercial?: boolean
}

export default function SampleEstimate({ isCommercial = false }: SampleEstimateProps) {
  return (
    <div className="text-xs overflow-hidden">
      <div className="text-center mb-4">
        <h2 className="font-bold text-lg">{isCommercial ? "COMMERCIAL" : "RESIDENTIAL"} DEMOLITION ESTIMATE</h2>
        <p>Project: {isCommercial ? "Office Building Renovation" : "Residential Kitchen Renovation"}</p>
        <p>Date: 03/03/2025</p>
      </div>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1 text-left">Material</th>
            <th className="border border-gray-300 p-1">Qty</th>
            <th className="border border-gray-300 p-1">Unit</th>
            <th className="border border-gray-300 p-1">Material Cost</th>
            <th className="border border-gray-300 p-1">Total Material</th>
            <th className="border border-gray-300 p-1">Labor Rate</th>
            <th className="border border-gray-300 p-1">MH Unit</th>
            <th className="border border-gray-300 p-1">Total MH</th>
            <th className="border border-gray-300 p-1">Total Labor</th>
            <th className="border border-gray-300 p-1">Line Total</th>
          </tr>
        </thead>
        <tbody>
          {isCommercial ? (
            // Commercial sample items
            <>
              <tr>
                <td className="border border-gray-300 p-1">Metal Stud Partition Wall</td>
                <td className="border border-gray-300 p-1 text-center">1200</td>
                <td className="border border-gray-300 p-1 text-center">SF</td>
                <td className="border border-gray-300 p-1 text-center">$0.75</td>
                <td className="border border-gray-300 p-1 text-center">$900.00</td>
                <td className="border border-gray-300 p-1 text-center">$55.00</td>
                <td className="border border-gray-300 p-1 text-center">0.03</td>
                <td className="border border-gray-300 p-1 text-center">36.0</td>
                <td className="border border-gray-300 p-1 text-center">$1,980.00</td>
                <td className="border border-gray-300 p-1 text-center">$2,880.00</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1">Suspended Acoustic Ceiling</td>
                <td className="border border-gray-300 p-1 text-center">2500</td>
                <td className="border border-gray-300 p-1 text-center">SF</td>
                <td className="border border-gray-300 p-1 text-center">$0.50</td>
                <td className="border border-gray-300 p-1 text-center">$1,250.00</td>
                <td className="border border-gray-300 p-1 text-center">$55.00</td>
                <td className="border border-gray-300 p-1 text-center">0.025</td>
                <td className="border border-gray-300 p-1 text-center">62.5</td>
                <td className="border border-gray-300 p-1 text-center">$3,437.50</td>
                <td className="border border-gray-300 p-1 text-center">$4,687.50</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1">Commercial Light Fixtures</td>
                <td className="border border-gray-300 p-1 text-center">45</td>
                <td className="border border-gray-300 p-1 text-center">EA</td>
                <td className="border border-gray-300 p-1 text-center">$25.00</td>
                <td className="border border-gray-300 p-1 text-center">$1,125.00</td>
                <td className="border border-gray-300 p-1 text-center">$55.00</td>
                <td className="border border-gray-300 p-1 text-center">0.75</td>
                <td className="border border-gray-300 p-1 text-center">33.75</td>
                <td className="border border-gray-300 p-1 text-center">$1,856.25</td>
                <td className="border border-gray-300 p-1 text-center">$2,981.25</td>
              </tr>
            </>
          ) : (
            // Residential sample items
            <>
              <tr>
                <td className="border border-gray-300 p-1">Concrete Slab (4")</td>
                <td className="border border-gray-300 p-1 text-center">500</td>
                <td className="border border-gray-300 p-1 text-center">SF</td>
                <td className="border border-gray-300 p-1 text-center">$1.25</td>
                <td className="border border-gray-300 p-1 text-center">$625.00</td>
                <td className="border border-gray-300 p-1 text-center">$45.00</td>
                <td className="border border-gray-300 p-1 text-center">0.05</td>
                <td className="border border-gray-300 p-1 text-center">25.0</td>
                <td className="border border-gray-300 p-1 text-center">$1,125.00</td>
                <td className="border border-gray-300 p-1 text-center">$1,750.00</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1">Interior Walls</td>
                <td className="border border-gray-300 p-1 text-center">350</td>
                <td className="border border-gray-300 p-1 text-center">LF</td>
                <td className="border border-gray-300 p-1 text-center">$0.75</td>
                <td className="border border-gray-300 p-1 text-center">$262.50</td>
                <td className="border border-gray-300 p-1 text-center">$45.00</td>
                <td className="border border-gray-300 p-1 text-center">0.10</td>
                <td className="border border-gray-300 p-1 text-center">35.0</td>
                <td className="border border-gray-300 p-1 text-center">$1,575.00</td>
                <td className="border border-gray-300 p-1 text-center">$1,837.50</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1">Plumbing Fixtures</td>
                <td className="border border-gray-300 p-1 text-center">12</td>
                <td className="border border-gray-300 p-1 text-center">EA</td>
                <td className="border border-gray-300 p-1 text-center">$15.00</td>
                <td className="border border-gray-300 p-1 text-center">$180.00</td>
                <td className="border border-gray-300 p-1 text-center">$45.00</td>
                <td className="border border-gray-300 p-1 text-center">0.75</td>
                <td className="border border-gray-300 p-1 text-center">9.0</td>
                <td className="border border-gray-300 p-1 text-center">$405.00</td>
                <td className="border border-gray-300 p-1 text-center">$585.00</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mb-2">
        <div className="w-1/3">
          <div className="flex justify-between border-t border-gray-300 pt-1">
            <span className="font-semibold">Subtotal:</span>
            <span>{isCommercial ? "$10,548.75" : "$4,172.50"}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold">Additional Costs:</span>
            <span>{isCommercial ? "$2,500.00" : "$850.00"}</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-1">
            <span className="font-semibold">Estimate Subtotal:</span>
            <span>{isCommercial ? "$13,048.75" : "$5,022.50"}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold">Overhead & Profit (15%):</span>
            <span>{isCommercial ? "$1,957.31" : "$753.38"}</span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-1 font-bold">
            <span>Proposed Demolition Price:</span>
            <span>{isCommercial ? "$15,006.06" : "$5,775.88"}</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 p-2 mt-2">
        <p className="font-semibold mb-1">Exclusions:</p>
        <p className="text-xs">
          {isCommercial
            ? "Permits, hazardous material abatement, utility disconnections, structural shoring, and after-hours work not included. Customer responsible for identifying all utilities prior to work commencement."
            : "Permits, hazardous material removal, utility disconnections, and structural shoring not included. Customer responsible for identifying all utilities prior to work commencement."}
        </p>
      </div>
    </div>
  )
}
