import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MedicalExaminerProcess = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Medical Examiner Process and Cemetery Charges</h1>
          <p className="text-muted-foreground mb-6">
            Information about the Medical Examiner Process and Cemetery Fees effective from 1st April 2024.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Medical Examiner Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <object
                data="/Flowchart-ME-Process-NBC-Final-1.pdf"
                type="application/pdf"
                width="100%"
                height="500px"
                className="mb-4"
              >
                <p>
                  Unable to display PDF file.{" "}
                  <a
                    href="/Flowchart-ME-Process-NBC-Final-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Download PDF
                  </a>
                </p>
              </object>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cemetery Fees and Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-4">Graves without Exclusive Right of Burial</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-right">Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Child in the Forget Me Not Garden</TableCell>
                        <TableCell className="text-right">No charge</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Stillborn child or child under 16 years (unpurchased grave)</TableCell>
                        <TableCell className="text-right">No charge</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Child from outside of East Staffordshire</TableCell>
                        <TableCell className="text-right">£48.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Person over 16 years</TableCell>
                        <TableCell className="text-right">£792.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Graves with Exclusive Right of Burial</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-right">Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Purchase of Exclusive Right of Burial</TableCell>
                        <TableCell className="text-right">£1,245.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Purchase of Exclusive Right of Burial for cremated remains</TableCell>
                        <TableCell className="text-right">£433.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Additional cost for bricked grave</TableCell>
                        <TableCell className="text-right">£219.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Burial of cremated remains</TableCell>
                        <TableCell className="text-right">£219.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Admin charge for multiple interments</TableCell>
                        <TableCell className="text-right">£54.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Monument and Memorial Permits</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Standard gravestone (up to 1,350mm × 914mm × 460mm)</TableCell>
                        <TableCell className="text-right">£378.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cremated remains memorial (up to 610mm × 610mm × 460mm)</TableCell>
                        <TableCell className="text-right">£378.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vase (unless incorporated in memorial)</TableCell>
                        <TableCell className="text-right">£94.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Additional inscription</TableCell>
                        <TableCell className="text-right">£122.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Forget-Me-Not Memorial</TableCell>
                        <TableCell className="text-right">£60.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Full kerbset (kerbs & headstone)</TableCell>
                        <TableCell className="text-right">£1,267.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Burial Times</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Latest Start</TableHead>
                        <TableHead className="text-right">Conclusion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>January</TableCell>
                        <TableCell>2:30pm</TableCell>
                        <TableCell className="text-right">3:30pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>February</TableCell>
                        <TableCell>3:30pm</TableCell>
                        <TableCell className="text-right">4:30pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>March</TableCell>
                        <TableCell>4:00pm</TableCell>
                        <TableCell className="text-right">5:00pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April-August</TableCell>
                        <TableCell>5:45pm</TableCell>
                        <TableCell className="text-right">6:45pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>September</TableCell>
                        <TableCell>5:30pm</TableCell>
                        <TableCell className="text-right">6:30pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>October</TableCell>
                        <TableCell>4:00pm</TableCell>
                        <TableCell className="text-right">5:00pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>November</TableCell>
                        <TableCell>2:45pm</TableCell>
                        <TableCell className="text-right">3:45pm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>December</TableCell>
                        <TableCell>2:30pm</TableCell>
                        <TableCell className="text-right">3:30pm</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>

                <section className="prose dark:prose-invert max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Standing Regulations</h3>
                  <div className="space-y-4">
                    <p>
                      The fees apply only to those residing in the Borough of East Staffordshire at the time of death. 
                      The normal requirement for residency is that the deceased lived within the Borough for the twelve months prior to death.
                    </p>
                    <p>
                      For non-residents, the interment fee and Exclusive Right of Burial fee (where applicable) is trebled. 
                      Non-residents are exempt from the trebled fees if they meet any of the following criteria:
                    </p>
                    <ul className="list-disc pl-6">
                      <li>The deceased had previously lived within the Borough within the last 20 years for a period exceeding 5 years</li>
                      <li>The deceased was a former resident within the Borough within the last 20 years for a period exceeding 5 years but moved outside the Borough to a rest/nursing home</li>
                    </ul>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalExaminerProcess;