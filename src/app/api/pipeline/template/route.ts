import { NextResponse } from "next/server";

const SAMPLE_CSV = `Deal Name,Stage,Value,Close Date,Created Date,Contact Name,Company Name,Notes
Solvari Platform License,Closed Won,36000,2025-01-20,2024-10-08,Martijn de Vries,Solvari BV,12-month annual contract. Upsell from starter.
Lieferando Logistics Module,Negotiation,52000,2025-04-10,2024-12-03,Katharina Braun,Lieferando GmbH,Legal reviewing MSA. Procurement involved.
MedTech Solutions - Analytics,Proposal Sent,28000,2025-05-15,2025-01-14,Dr. Elena Vasquez,MedTech Solutions SL,Needs GDPR data processing addendum.
Bouw7 Construction Suite,Qualified,44000,,2025-01-22,Pieter van den Berg,Bouw7 BV,Saw us at SaaS North conference. 80-seat team.
Finleap Compliance Add-on,Interested,18000,,2025-02-03,Sophie Richter,Finleap GmbH,Inbound from blog post on revenue ops.
CloudKitchens EU Rollout,Closed Won,61000,2024-12-18,2024-07-25,Antoine Moreau,CloudKitchens FR,Multi-region deal. 6-month sales cycle.
Pleo Expense Integration,Demo Scheduled,32000,,2025-02-10,Ida Andersen,Pleo ApS,Referred by existing customer.
TravelPerk Ops Expansion,Proposal Sent,47000,2025-06-01,2024-11-29,Marc Serra,TravelPerk SL,Expanding from 1 team to company-wide.
Staffbase Internal Comms,Cold Lead,15000,,2025-02-06,Jan Müller,Staffbase GmbH,Downloaded whitepaper. No response yet.
Doctolib Analytics Platform,SQL,55000,2025-07-01,2025-01-08,Camille Laurent,Doctolib SAS,"Competitive deal — also evaluating Clari, Gong."
SportHero Membership Suite,MQL,24000,,2025-01-30,Lukas Nowak,SportHero Sp. z o.o.,Engaged with 3 emails. Booked intro call next week.
Personio HR Module,Closed Lost,38000,2025-01-12,2024-09-15,Hannah Fischer,Personio SE,Lost to internal build. Budget reallocated to eng.
Treatwell Booking Upgrade,Opportunity,29000,2025-05-20,2024-12-20,Laura Bianchi,Treatwell IT,Champion is VP Ops. Need exec sponsor sign-off.
Swapfiets Fleet Dashboard,Warm Lead,21000,,2025-02-08,Thomas Bakker,Swapfiets BV,Met at Dutch startup meetup. Early stage interest.
Sorare Analytics License,Negotiation,68000,2025-03-28,2024-10-30,Nicolas Durand,Sorare SAS,Final pricing review. Asking for 2-year discount.`;

export async function GET() {
  return new NextResponse(SAMPLE_CSV, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="fromthoughts-pipeline-template.csv"',
    },
  });
}
