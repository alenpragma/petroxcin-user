import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Crown } from "lucide-react";
import { CopyToClipboard } from "@/src/components/shared/copyClipboard/copyClipboard";

export function ReferralLink({ refer }: { refer: string }) {
  const { copy, copied } = CopyToClipboard();
  const referralURL = `https://www.petroxcin.com/register?refer=${refer}`;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Your Referral Link</h3>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span className="text-blue-600 font-medium">Member</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            value={`https://www.petroxcin.com/register?refer=${refer}`}
            readOnly
            className="bg-gray-50"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => copy(referralURL)}
          >
            {copied ? "Copied" : "Copy Link"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
