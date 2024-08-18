function main() {
  // Start Page
  Operate.newPage();

  // Display some equations or formulas using KaTeX
  Operate.newStart("Equations:");
  Operate.newStep("Eq. 1: (a = \\frac{{v_f - v_i}}{{t}})");
  Operate.newStep("Eq. 2: (v_f = v_i + at)");
  Operate.newStep("Eq. 3: (s = v_i t + \\frac{1}{2}at^2)");

  // Create input fields for two of the four quantities: initial velocity, final velocity, time, or displacement
  Operate.newInput([
    "Initial Velocity (m/s):",
    "Final Velocity (m/s):",
    "Time (seconds):",
    "Displacement (meters):",
  ]).then((inputValues) => {
    // Extract user inputs
    const initialVelocity = parseFloat(inputValues[0]);
    const finalVelocity = parseFloat(inputValues[1]);
    const time = parseFloat(inputValues[2]);
    const displacement = parseFloat(inputValues[3]);

    // Declare variables for the results
    let acceleration,
      calculatedFinalVelocity,
      calculatedTime,
      calculatedDisplacement;

    // Determine which two values are provided and calculate the others
    if (!isNaN(initialVelocity) && !isNaN(finalVelocity) && !isNaN(time)) {
      // Calculate displacement using Equation 3
      acceleration = (finalVelocity - initialVelocity) / time;
      calculatedDisplacement =
        initialVelocity * time + 0.5 * acceleration * time * time;

      // Display the result
      Operate.newStart("Result:");
      Operate.newSolution("Displacement (meters) = ");
      Operate.newStep(calculatedDisplacement.toString());
    } else if (
      !isNaN(initialVelocity) &&
      !isNaN(finalVelocity) &&
      !isNaN(displacement)
    ) {
      // Calculate time using rearranged Equation 3
      acceleration =
        (finalVelocity * finalVelocity - initialVelocity * initialVelocity) /
        (2 * displacement);
      calculatedTime = (finalVelocity - initialVelocity) / acceleration;

      // Display the result
      Operate.newStart("Result:");
      Operate.newSolution("Time (seconds) = ");
      Operate.newStep(calculatedTime.toString());
    } else if (
      !isNaN(initialVelocity) &&
      !isNaN(time) &&
      !isNaN(displacement)
    ) {
      // Calculate acceleration using Equation 3
      acceleration =
        (2 * (displacement - initialVelocity * time)) / (time * time);
      calculatedFinalVelocity = initialVelocity + acceleration * time;

      // Display the result
      Operate.newStart("Result:");
      Operate.newSolution("Final Velocity (m/s) = ");
      Operate.newStep(calculatedFinalVelocity.toString());
    } else if (!isNaN(finalVelocity) && !isNaN(time) && !isNaN(displacement)) {
      // Calculate initial velocity using rearranged Equation 3
      acceleration =
        (2 * (displacement - finalVelocity * time)) / (time * time);
      const calculatedInitialVelocity = finalVelocity - acceleration * time;

      // Display the result
      Operate.newStart("Result:");
      Operate.newSolution("Initial Velocity (m/s) = ");
      Operate.newStep(calculatedInitialVelocity.toString());
    } else {
      // Handle the case where there are not enough inputs
      Operate.newStart("Error:");
      Operate.newStart(
        "Please provide any three of the four quantities (Initial Velocity, Final Velocity, Time, Displacement) to calculate the fourth."
      );
    }

    // Add a reset button
    Operate.newRestart();
  });
}
